import { randomUUID, randomBytes } from 'crypto'

import { PrismaAdapter } from '@auth/prisma-adapter'
import { AuthService } from '@api/auth/AuthService'
import prisma from '@api/lib/prisma'
import { AuthSession, AuthSessionUser } from '@typings/auth'
import { JWTTokenExtended } from '@typings/common'
import { AuthOptions, DefaultSession } from 'next-auth'
import { Adapter } from 'next-auth/adapters'
import Credentials from 'next-auth/providers/credentials'
import { decode, encode } from 'next-auth/jwt'
import chalk from 'chalk'

export const authConfig: AuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60, // 7 days
    updateAge: 24 * 60 * 60, // 24 hours

    generateSessionToken: () => {
      return randomUUID?.() ?? randomBytes(32).toString('hex')
    }
  },
  jwt: { encode, decode },
  callbacks: {
    async jwt ({ token, account }): Promise<JWTTokenExtended> {
      if (account && account.type === 'credentials') {
        token.userId = account.providerAccountId
      }

      const user = await prisma.user.findUnique({
        where: {
          id: token.userId as string
        },
        select: {
          id: true,
          email: true,
          role: true
        }
      })

      return {
        ...token,
        user
      }
    },
    async session ({ session, token }): Promise<AuthSession | DefaultSession> {
      const user = await prisma.user.findUnique({
        where: {
          id: token.userId as string,
          deletedAt: null
        },
        select: {
          id: true,
          email: true,
          firstname: true,
          lastname: true,
          emailVerified: true,
          role: {
            select: {
              key: true,
              permissions: {
                select: {
                  permission: true,
                  scope: true
                }
              }
            }
          },
          userTerms: {
            select: {
              acceptedAt: true,
              termsKey: true,
              terms: {
                select: {
                  key: true,
                  updatedAt: true
                }
              }
            }
          },
          validationTokens: {
            where: {
              validatedAt: null
            },
            select: {
              type: true
            }
          }
        }
      })

      return {
        ...session,
        user: user
          ? {
              id: user.id,
              firstname: user.firstname,
              lastname: user.lastname,
              emailVerified: user.emailVerified,
              email: user.email,
              role: {
                key: user.role.key,
                permissions: user.role.permissions.map(permission =>
                  `${permission.permission.resource}:${permission.permission.ability}.${permission.scope}`)
              },
              activeTokens: user?.validationTokens?.map(active => active.type) ?? [],
              acceptedTerms: user.userTerms.map(terms => {
                return {
                  termsKey: terms.termsKey,
                  acceptedAt: terms.acceptedAt,
                  terms: {
                    key: terms.terms.key,
                    updatedAt: terms.terms.updatedAt
                  }
                }
              })
            }
          : {} as AuthSessionUser
      }
    }
  },
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'email' },
        password: { label: 'Passwort', type: 'password' }
      },
      async authorize (credentials) {
        const start = Date.now()

        const authService = new AuthService(prisma)

        const { email, password } = credentials as {
          email: string
          password: string
         }

        const user = await authService.getUserFromCredentials({
          email,
          password
        })

        if (!user) {
          console.log(chalk.red(`🔐 Auth: Credentials login for ${email}, Error: wrong credentials`))
          return null
        }

        const duration = Date.now() - start

        console.log(chalk.green(`🔐 Auth: Credentials login for ${email}, Duration: ${duration}ms`))

        return user
      }
    })
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: '/login'
  }
}
