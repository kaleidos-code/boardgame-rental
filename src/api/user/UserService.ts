import { GraphQLError } from 'graphql'
import { PrismaClient, RentalStatus, TokenType, User } from '@prisma/client'
import jwt from 'jsonwebtoken'
import { convertToSeconds } from '@utils/format'
import { MailingTemplates } from '@typings/mailing'

import { apiConfig } from '../config/config'
import { AuthService } from '../auth/AuthService'
import { sendMail } from '../lib/mail'

export class UserService {
  private authService: AuthService

  constructor (
    private readonly prisma: PrismaClient
  ) {
    this.authService = new AuthService(prisma)
  }

  async checkUserHasRentings (userId: string): Promise<boolean> {
    const rentings = await this.prisma.rental.count({
      where: {
        userId,
        status: RentalStatus.RENTED
      }
    })

    return rentings > 0
  }

  async sendDoubleOptInMailToUser (email: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: {
        email
      }
    })

    if (!user) {
      throw new GraphQLError('error.user.notFound')
    }

    if (user.emailVerified) {
      throw new GraphQLError('error.user.emailAlreadyVerified')
    }

    await this.authService.handleSendDoubleOptInEmail(user)

    return true
  }

  async sendEmailChangeMailToUser (user: User, newEmail: string, prismaTx?: PrismaClient): Promise<boolean> {
    const { security } = apiConfig

    const expiresInSeconds = convertToSeconds(security.optInExpiration)

    const token = jwt.sign({
      userId: user.id
    },
    security.secret,
    {
      expiresIn: expiresInSeconds
    })

    await (prismaTx || this.prisma).user.update({
      where: {
        id: user.id
      },
      data: {
        emailVerified: null
      }
    })

    await (prismaTx || this.prisma).validationToken.upsert({
      where: {
        userId_type: {
          userId: user.id,
          type: TokenType.NEW_EMAIL
        }
      },
      update: {
        token,
        meta: {
          newEmail
        },
        validatedAt: null
      },
      create: {
        token,
        type: TokenType.NEW_EMAIL,
        userId: user.id,
        meta: {
          newEmail
        }
      }
    })

    const optInToken = await (prismaTx || this.prisma).validationToken.findUnique({
      where: {
        userId_type: {
          userId: user.id,
          type: TokenType.OPT_IN
        }
      }
    })

    if (optInToken) {
      await (prismaTx || this.prisma).validationToken.update({
        where: {
          userId_type: {
            userId: user.id,
            type: TokenType.OPT_IN
          }
        },
        data: {
          validatedAt: new Date()
        }
      })
    }

    await sendMail({
      to: newEmail,
      subject: {
        key: 'mail.newMailOptIn.subject'
      },
      template: MailingTemplates.EMAIL_CHANGED,
      templateProps: {
        href: `${process.env.APP_URL}/opt-in-new/${token}`,
        name: user.firstname,
        expiresAt: new Date(Date.now() + expiresInSeconds * 1000)
      }
    })

    return true
  }
}
