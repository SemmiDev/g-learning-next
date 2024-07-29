import { AuthOptions } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { jwtDecode } from 'jwt-decode'

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {},
      async authorize(credentials, req): Promise<any> {
        // console.log(credentials)

        if (req.body?.username == 'pengajar@glearning.com') {
          return {
            id: 1,
            name: 'Nama Pengajar',
            email: 'pengajar@glearning.com',
            jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsZXZlbCI6IlBlbmdhamFyIiwiaWF0IjoxNTE2MjM5MDIyfQ.8cffnhxieDxB7ufL2Tyckb2k39lgsKrzF3Axp-i4iVc',
          }
        }

        if (req.body?.username == 'peserta@glearning.com') {
          return {
            id: 2,
            name: 'Nama Peserta',
            email: 'peserta@glearning.com',
            jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsZXZlbCI6IlBlc2VydGEiLCJpYXQiOjE1MTYyMzkwMjJ9.MhaAQ43OFkJrznl-J37Wt30JACuMZLhRdcRpgkl0mhA',
          }
        }

        if (req.body?.username == 'admin@glearning.com') {
          return {
            id: 3,
            name: 'Nama Admin',
            email: 'admin@glearning.com',
            jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsZXZlbCI6IkFkbWluIiwiaWF0IjoxNTE2MjM5MDIyfQ.Vq_GAU2EbhVQO386WazO6cgxvDDf8Ne9_IZkOsFRzvs',
          }
        }

        if (req.body?.username == 'instansi@glearning.com') {
          return {
            id: 4,
            name: 'Nama Admin Instansi',
            email: 'instansi@glearning.com',
            jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsZXZlbCI6Ikluc3RhbnNpIiwiaWF0IjoxNTE2MjM5MDIyfQ.tqIFPLQoImOa13tTuGmM4TQdwFqAfk_-laBhgPryI1w',
          }
        }

        return null
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
          jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsZXZlbCI6IlBlbmdhamFyIiwiaWF0IjoxNTE2MjM5MDIyfQ.8cffnhxieDxB7ufL2Tyckb2k39lgsKrzF3Axp-i4iVc',
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
        const jwtToken = token.jwt as string
        const decoded = jwtDecode<any>(jwtToken)

        // add extra data to session
        session.level = decoded.level
        session.jwt = jwtToken
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
