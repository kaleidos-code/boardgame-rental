import { Arg, Authorized, Ctx, FieldResolver, Int, Mutation, Query, Resolver, Root } from 'type-graphql'
import { bcryptPassword } from '@utils/password'
import prisma from '@api/lib/prisma'
import type { GraphQlContext } from '@typings/common'
import { GraphQLError } from 'graphql'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { PrismaClient } from '@prisma/client'

import { FilterInput } from '../pagination/dto/FilterInput'
import { OrderInput } from '../pagination/dto/OrderInput'
import { Role } from '../role/models/Role'
import { TokenType } from '../validationToken/model/ValidationToken'
import { PaginationService } from '../pagination/PaginationService'
import { AuthService } from '../auth/AuthService'
import { TermsType } from '../terms/models/Terms'

import { UpdateUserInput } from './dto/UpdateUserInput'
import { CreateUserInput } from './dto/CreateUserInput'
import { PaginatedUsers } from './models/PaginatedUsers'
import { UserService } from './UserService'
import { UpdateMeInput } from './dto/UpdateMeInput'
import { User } from './models/User'

@Resolver(() => User)
export class UserResolver {
  private userService: UserService
  private paginationService: PaginationService
  private authService: AuthService

  constructor () {
    this.userService = new UserService(prisma)
    this.paginationService = new PaginationService(prisma)
    this.authService = new AuthService(prisma)
  }

  @Authorized()
  @Query(() => User)
  async me (@Ctx() ctx: GraphQlContext) {
    return await prisma.user.findUnique({
      where: {
        id: ctx.session?.user?.id
      }
    })
  }

  @Authorized(['user:read'])
  @Query(() => [User])
  async users () {
    return await prisma.user.findMany({
      where: {
        deletedAt: null
      }
    })
  }

  @Authorized(['user:read'])
  @Query(() => User)
  async user (@Arg('id') id: string) {
    return await prisma.user.findUnique({
      where: {
        id,
        deletedAt: null
      }
    })
  }

  @Query(() => PaginatedUsers)
  async usersPaginated (
    @Arg('offset', () => Int)
      offset: number,
    @Arg('limit', () => Int)
      limit: number,
    @Arg('orderBy', () => [OrderInput], { nullable: true })
      orderBy?: OrderInput[],
    @Arg('filterBy', () => [FilterInput], { nullable: true })
      filterBy?: FilterInput[]
  ) {
    const dataBase = process.env.POSTGRES_DB
    const columns = Object.keys(prisma.user.fields)
      .map(key => `"User"."${key}"`)
      .join(', ')

    const tableName = User.name

    const joinedTable = `
    WITH "${tableName}" AS (
      SELECT ${columns}
      FROM 
      "${dataBase}"."${tableName}"
      GROUP BY "${tableName}"."id"
    )`

    return await this.paginationService.getPaginatedResponse<PaginatedUsers, User>(
      {
        table: joinedTable,
        tableName,
        hasSoftDelete: true
      },
      {
        offset,
        limit
      },
      orderBy,
      filterBy
    )
  }

  @Authorized(['user:create'])
  @Mutation(() => User)
  async createUser (@Arg('data') data: CreateUserInput) {
    const randomPassword = await bcryptPassword(Math.random().toString(36).substring(16))

    try {
      const user = await prisma.user.create({
        data: {
          ...data,
          password: randomPassword
        }
      })

      await this.authService.handleSendDoubleOptInEmail(user)

      return user
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

  @Authorized(['user:update'])
  @Mutation(() => User)
  async updateUser (
    @Arg('id') id: string,
    @Arg('data') data: UpdateUserInput
  ) {
    return await prisma.user.update({
      where: {
        id
      },
      data
    })
  }

  @Authorized()
  @Mutation(() => User)
  async updateMe (
    @Ctx() ctx: GraphQlContext,
    @Arg('data') data: UpdateMeInput
  ) {
    const { email, ...rest } = data

    const user = await prisma.$transaction(async (prismaTx) => {
      const updateMe = await prismaTx.user.update({
        where: {
          id: ctx.session?.user?.id
        },
        data: rest
      })

      if (!updateMe) {
        throw new GraphQLError('error.user.notFound')
      }

      if (email && email !== updateMe.email) {
        await this.userService.sendEmailChangeMailToUser(updateMe, email, prismaTx as PrismaClient)
      }

      return await prismaTx.user.findUnique({
        where: {
          id: ctx.session?.user?.id
        }
      })
    })

    return user
  }

  @Authorized(['user:delete'])
  @Mutation(() => User)
  async softDeleteUser (@Arg('id') id: string) {
    if (await this.userService.checkUserHasRentings(id)) {
      throw new GraphQLError('error.user.hasRentings')
    }

    return await prisma.user.update({
      where: {
        id
      },
      data: {
        deletedAt: new Date(),
        email: `${id}-deleted`,
        firstname: 'Deleted',
        lastname: 'User',
        sessions: {
          deleteMany: {}
        },
        accounts: {
          deleteMany: {}
        }
      }
    })
  }

  @Authorized(['user:create'])
  @Mutation(() => Boolean)
  async sendDoubleOptInMail (@Arg('email') email: string) {
    await this.userService.sendDoubleOptInMailToUser(email)

    return true
  }

  @Authorized()
  @Mutation(() => Boolean)
  async sendDoubleOptInMailToMe (@Ctx() ctx: GraphQlContext) {
    if (!ctx.session?.user?.email) {
      throw new GraphQLError('error.user.notFound')
    }

    await this.userService.sendDoubleOptInMailToUser(ctx.session?.user?.email)

    return true
  }

  @Authorized()
  @Mutation(() => Boolean)
  async sendDoubleOptInNewMailToMe (@Ctx() ctx: GraphQlContext) {
    if (!ctx.session?.user?.id) {
      throw new GraphQLError('error.user.notFound')
    }

    const token = await prisma.validationToken.findUnique({
      where: {
        userId_type: {
          userId: ctx.session?.user?.id,
          type: TokenType.NEW_EMAIL
        }
      },
      include: {
        user: true
      }
    })

    if (!token) {
      throw new GraphQLError('error.auth.tokenNotFound')
    }

    if (typeof token.meta === 'object' && token.meta !== null && 'newEmail' in token.meta) {
      await this.userService.sendEmailChangeMailToUser(token.user, token.meta.newEmail as string || '')

      return true
    } else {
      throw new GraphQLError('error.auth.tokenNotFound')
    }
  }

  @Authorized()
  @Mutation(() => Boolean)
  async acceptTerms (@Ctx() ctx: GraphQlContext, @Arg('terms', () => [TermsType]) terms: TermsType[]) {
    const user = await prisma.user.findUnique({
      where: {
        id: ctx.session?.user?.id
      }
    })

    if (!user) {
      throw new GraphQLError('error.user.notFound')
    }

    for (const term of terms) {
      await prisma.userTerms.upsert({
        where: {
          userId_termsKey: {
            userId: user.id,
            termsKey: term
          }
        },
        update: {
          acceptedAt: new Date()
        },
        create: {
          userId: user.id,
          termsKey: term,
          acceptedAt: new Date()
        }
      })
    }

    return true
  }

  @FieldResolver(() => Role)
  async role (
    @Root() parent: User
  ) {
    return await prisma.role.findUnique({
      where: {
        id: parent.roleId
      }
    })
  }

  @FieldResolver(() => TokenType, { nullable: true })
  async activeToken (
    @Root() parent: User,
    @Arg('type') type: TokenType
  ) {
    if (type) {
      const token = await prisma.validationToken.findUnique({
        where: {
          userId_type: {
            userId: parent.id,
            type
          },
          validatedAt: null
        }
      })

      return token?.type || null
    }

    return null
  }
}
