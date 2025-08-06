import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql'
import jwt from 'jsonwebtoken'
import { GraphQLError } from 'graphql'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import prisma from '@api/lib/prisma'
import { PrismaClient, TokenType } from '@prisma/client'
import type { GraphQlContext } from '@typings/common'

import { apiConfig } from '../config/config'
import { TermsType } from '../terms/models/Terms'

import { LoginInput } from './dto/LoginInput'
import { SignUpInput } from './dto/SignUpInput'
import { SetPasswordInput } from './dto/ResetPasswordInput'
import { PasswordChangeInput } from './dto/PasswordChangeInput'
import { AuthService } from './AuthService'

@Resolver()
export class AuthResolver {
  private authService: AuthService

  constructor () {
    this.authService = new AuthService(prisma)
  }

  @Mutation(() => String)
  async login (
    @Arg('data') data: LoginInput
  ) {
    const user = await this.authService.getUserFromCredentials(data)
    const config = apiConfig.security

    if (!user) {
      throw new GraphQLError('Invalid credentials')
    }

    const token = jwt.sign({ userId: user.id }, config.secret as string)

    return token
  }

  @Mutation(() => Boolean)
  async signUp (
    @Arg('data') data: SignUpInput
  ) {
    const { password, postalCode, termsAccepted, ...rest } = data

    if (!termsAccepted) {
      throw new GraphQLError('error.auth.termsNotAccepted')
    }

    try {
      const appConfig = await prisma.appConfig.findUnique({
        where: {
          key: 'app'
        }
      })

      if (appConfig?.signUpDisabled) {
        throw new GraphQLError('error.auth.resgistrationDisabled')
      }

      const isPasswordValid = this.authService.checkPasswordPattern(password)

      if (!isPasswordValid) {
        throw new GraphQLError('error.password.notMatchingPattern')
      }

      const userRole = await prisma.role.findFirst({
        where: {
          key: 'user'
        }
      })

      if (!userRole) {
        throw new GraphQLError('error.role.notFound')
      }

      const postalCodeExists = await prisma.postalCode.findUnique({
        where: {
          code: postalCode
        }
      })

      if (!postalCodeExists) {
        throw new GraphQLError('error.auth.postalCodeInvalid')
      }

      await prisma.$transaction(async (prismaTx) => {
        const result = await prismaTx.user.create({
          data: {
            ...rest,
            postalCode,
            roleId: userRole?.id,
            password: await this.authService.hashPassword(password)
          }
        })

        await prismaTx.userTerms.createMany({
          data: [{
            userId: result.id,
            acceptedAt: new Date(),
            termsKey: TermsType.TERMS
          }, {
            userId: result.id,
            acceptedAt: new Date(),
            termsKey: TermsType.PRIVACY
          }]
        })

        await this.authService.handleSendDoubleOptInEmail(result, prismaTx as PrismaClient)
      })

      return true
    } catch (error: any) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new GraphQLError('error.user.alreadyExists')
      }
      throw new GraphQLError(error)
    }
  }

  @Mutation(() => Boolean)
  async forgotPassword (
    @Arg('email') email: string
  ) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email
        }
      })

      if (user) {
        await this.authService.handleSendResetPasswordMail(user)
      }

      return true
    } catch (error: any) {
      throw new GraphQLError(error)
    }
  }

  @Mutation(() => Boolean)
  async setPassword (
    @Arg('data') data: SetPasswordInput
  ) {
    const { token, password, optIn } = data

    try {
      const decodedToken = jwt.verify(token, apiConfig.security.secret) as { userId: string }

      const user = await prisma.user.findUnique({
        where: {
          id: decodedToken.userId
        }
      })

      if (!user) {
        throw new GraphQLError('error.auth.invalidToken')
      }

      const isPasswordValid = this.authService.checkPasswordPattern(password)

      if (!isPasswordValid) {
        throw new GraphQLError('error.password.notMatchingPattern')
      }

      await prisma.user.update({
        where: {
          id: user.id
        },
        data: {
          password: await this.authService.hashPassword(password),
          ...(optIn ? { emailVerified: new Date() } : {})
        }
      })

      await prisma.validationToken.update({
        where: {
          userId_type: {
            userId: user.id,
            type: TokenType.PASSWORD
          }
        },
        data: {
          validatedAt: new Date()
        }
      })

      return true
    } catch (error: any) {
      throw new GraphQLError(error)
    }
  }

  @Authorized()
  @Mutation(() => Boolean)
  async changePassword (
    @Arg('data') data: PasswordChangeInput,
    @Ctx() ctx: GraphQlContext
  ) {
    const { oldPassword, newPassword } = data

    const user = await prisma.user.findUnique({
      where: {
        id: ctx.session?.user?.id
      }

    })

    if (!user) {
      throw new GraphQLError('error.user.notFound')
    }

    const passwordValid = await this.authService.validatePassword(oldPassword, user.password)

    if (!passwordValid) {
      throw new GraphQLError('error.auth.passwordInvalid')
    }

    const isValid = this.authService.checkPasswordPattern(newPassword)

    if (!isValid) {
      throw new GraphQLError('error.password.notMatchingPattern')
    }

    const newPasswordHash = await this.authService.hashPassword(newPassword)

    await prisma.user.update({
      where: {
        id: ctx.session?.user?.id
      },
      data: {
        password: newPasswordHash
      }
    })

    return true
  }
}
