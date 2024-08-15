import { DefaultSession, DefaultUser } from 'next-auth'

declare module 'next-auth' {
  interface Session extends DefaultSession {
    jwt: string
    refreshToken: string
    user?: {
      name?: string | null
      username?: string | null
      level?: string | null
      image?: string | null
    }
  }

  interface User extends DefaultUser {
    username: string
    jwt: string
    refreshToken?: string | null
  }
}
