export type ApiConfig = {
  security: {
    optInExpiration: string
    resetPasswordExpiration: string
    secret: string,
    bcryptSaltOrRound: number
  }
}

export const apiConfig: ApiConfig = {
  security: {
    optInExpiration: '24h',
    resetPasswordExpiration: '1h',
    secret: process.env.NEXTAUTH_SECRET as string,
    bcryptSaltOrRound: 10
  }
}
