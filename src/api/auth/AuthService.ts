import { compare, hash } from 'bcrypt'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { GraphQLError } from 'graphql'
import { PASSWORD_PATTERN } from '@shared/constants/password'
import { MailingTemplates } from '@typings/mailing'
import { convertToSeconds } from '@utils/format'
import { PrismaClient, TokenType, User } from '@prisma/client'
import { RoleTypes } from '@typings/roles'

import { apiConfig } from '../config/config'
import { sendMail } from '../lib/mail'

import { LoginInput } from './dto/LoginInput'

export class AuthService {
  constructor (
    private readonly prisma: PrismaClient
  ) {}

  private bcryptSaltRounds (): string | number {
    const saltOrRounds = apiConfig.security.bcryptSaltOrRound

    return Number.isInteger(Number(saltOrRounds))
      ? Number(saltOrRounds)
      : saltOrRounds
  }

  async getUserFromCredentials (data: LoginInput) {
    if (!data) {
      throw new Error('error.auth.credentialsSignin')
    }

    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: data.email
        }
      })

      if (!user || !user?.password) {
        throw new Error('error.auth.credentialsSignin')
      }

      const isCorrectPassword = await compare(
        data.password,
        user.password
      )

      if (!isCorrectPassword) {
        throw new Error('error.auth.credentialsSignin')
      }

      return user
    } catch (error) {
      console.log(error)
    }

    return null
  }

  async getUserByToken (token: string) {
    if (!token) {
      return null
    }

    try {
      const decodedToken = jwt.verify(token, apiConfig.security.secret) as JwtPayload
      const { userId } = decodedToken

      const user = await this.prisma.user.findUnique({
        where: {
          id: userId
        }
      })

      return user
    } catch (error) {
      console.log(error)
    }

    return null
  }

  async validateToken (token: string): Promise<string | null> {
    if (!token) {
      return null
    }

    const validationToken = await this.prisma.validationToken.findFirst({
      where: {
        token
      }
    })

    if (validationToken?.validatedAt) {
      throw new GraphQLError('error.auth.tokenAlreadyUsed')
    }

    try {
      const result = await jwt.verify(token, apiConfig.security.secret) as JwtPayload

      return result?.userId || null
    } catch (error) {
      console.log(error)
    }

    return null
  }

  async hashPassword (password: string) {
    return hash(password, this.bcryptSaltRounds())
  }

  async validatePassword (password: string, hashedPassword: string): Promise<boolean> {
    return compare(password, hashedPassword)
  }

  checkPasswordPattern (password: string) {
    const passwordPattern = new RegExp(PASSWORD_PATTERN)

    return passwordPattern.test(password)
  }

  async handleSendResetPasswordMail (user: User) {
    const { security } = apiConfig

    const expiresInSeconds = convertToSeconds(security.resetPasswordExpiration)

    const token = jwt.sign({
      userId: user.id
    },
    security.secret,
    {
      expiresIn: expiresInSeconds
    })

    await this.prisma.validationToken.upsert({
      where: {
        userId_type: {
          userId: user.id,
          type: TokenType.PASSWORD
        }
      },
      update: {
        token,
        validatedAt: null
      },
      create: {
        token,
        userId: user.id,
        type: TokenType.PASSWORD
      }
    })

    await sendMail({
      to: user.email,
      subject: {
        key: 'mail.resetPassword.subject'
      },
      template: MailingTemplates.RESET_PASSWORD,
      templateProps: {
        href: `${process.env.APP_URL}/reset-password/${token}`,
        name: user.firstname,
        expiresAt: new Date(Date.now() + expiresInSeconds * 1000)
      }
    })
  }

  async handleSendDoubleOptInEmail (user: User, prismaTx?: PrismaClient) {
    const { security } = apiConfig

    const expiresInSeconds = convertToSeconds(security.optInExpiration)

    const userRole = await (prismaTx || this.prisma).role.findFirst({
      where: {
        id: user.roleId
      }
    })

    const isUser = userRole?.key === RoleTypes.User

    const token = jwt.sign({
      userId: user.id
    },
    security.secret,
    {
      expiresIn: expiresInSeconds
    })

    await (prismaTx || this.prisma).validationToken.upsert({
      where: {
        userId_type: {
          userId: user.id,
          type: isUser ? TokenType.OPT_IN : TokenType.PASSWORD
        }
      },
      update: {
        token,
        validatedAt: null
      },
      create: {
        token,
        userId: user.id,
        type: isUser ? TokenType.OPT_IN : TokenType.PASSWORD
      }
    })

    await sendMail({
      to: user.email,
      subject: {
        key: 'mail.doubleOptIn.subject'
      },
      template: MailingTemplates.DOUBLE_OPT_IN,
      templateProps: {
        href: `${process.env.APP_URL}/${isUser ? 'opt-in' : 'set-password'}/${token}`,
        name: user.firstname,
        expiresAt: new Date(Date.now() + expiresInSeconds * 1000)
      }
    })
  }
}
