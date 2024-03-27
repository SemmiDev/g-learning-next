import { AuthOptions } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {},
      async authorize(credentials, req): Promise<any> {
        // console.log(credentials)

        // return null
        return {
          id: 123,
          name: 'Antoni',
          email: 'anto@gmail.com',
          jwt: 'iniadalahcontohjwt',
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
      async profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          jwt: 'iniadalahcontohjwt',
        }
      },
    }),
  ],
  session: {
    maxAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    jwt: async ({ token, user }: { token: JWT; user: any }) => {
      if (user) {
        return {
          ...token,
          jwt: user.jwt,
        }
      }

      return token
    },
    session: async ({ session, token }: { session: any; token: JWT }) => {
      if (token) {
        session.jwt = token.jwt
      }

      return session
    },
    signIn: async ({
      user,
      account,
      profile,
    }: {
      user: any
      account: any
      profile?: any
    }) => {
      // console.log('account', account)
      // console.log('user', user)
      // console.log('profile', profile)

      return true
    },
  },
  pages: {
    signIn: '/login',
  },
}
