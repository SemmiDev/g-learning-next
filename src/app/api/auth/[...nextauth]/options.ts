import { makeBasicPostRequestAction } from '@/utils/action'
import { jwtDecode } from 'jwt-decode'
import { AuthOptions } from 'next-auth'
import { AdapterUser } from 'next-auth/adapters'
import { JWT } from 'next-auth/jwt'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { Session, User } from 'node_modules/next-auth/core/types'

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        username: { label: 'Username', type: 'text ' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req): Promise<User> {
        // console.log(credentials)

        const { username, password } = credentials ?? {}

        if (username == 'pengajar@glearning.com') {
          return {
            id: '1',
            name: 'Nama Pengajar',
            username: 'pengajar@glearning.com',
            level: 'Pengajar',
            jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsZXZlbCI6IlBlbmdhamFyIiwiaWF0IjoxNTE2MjM5MDIyfQ.8cffnhxieDxB7ufL2Tyckb2k39lgsKrzF3Axp-i4iVc',
          }
        }

        if (username == 'peserta@glearning.com') {
          return {
            id: '2',
            name: 'Nama Peserta',
            username: 'peserta@glearning.com',
            level: 'Peserta',
            jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsZXZlbCI6IlBlc2VydGEiLCJpYXQiOjE1MTYyMzkwMjJ9.MhaAQ43OFkJrznl-J37Wt30JACuMZLhRdcRpgkl0mhA',
          }
        }

        if (username == 'admin@glearning.com') {
          return {
            id: '3',
            name: 'Nama Admin',
            username: 'admin@glearning.com',
            level: 'Admin',
            jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsZXZlbCI6IkFkbWluIiwiaWF0IjoxNTE2MjM5MDIyfQ.Vq_GAU2EbhVQO386WazO6cgxvDDf8Ne9_IZkOsFRzvs',
          }
        }

        if (username == 'instansi@glearning.com') {
          return {
            id: '4',
            name: 'Nama Admin Instansi',
            username: 'instansi@glearning.com',
            level: 'Instansi',
            jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsZXZlbCI6Ikluc3RhbnNpIiwiaWF0IjoxNTE2MjM5MDIyfQ.tqIFPLQoImOa13tTuGmM4TQdwFqAfk_-laBhgPryI1w',
          }
        }

        // Req to API
        const { success, message, data } = await makeBasicPostRequestAction(
          `${process.env.API_URL}/auth/login`,
          {
            email: username,
            kata_sandi: password,
          }
        )

        // console.log('data response', data)

        if (success) {
          return {
            id: data?.pengguna?.id,
            name: data?.pengguna?.nama,
            username: data?.pengguna?.username,
            level: data?.pengguna?.tipe,
            jwt: data?.token?.access_token,
            refreshToken: data?.token?.refresh_token,
          }
        }

        throw new Error(message)
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
      async profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          username: profile.email,
          level: 'Pengajar',
          jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsZXZlbCI6IlBlbmdhamFyIiwiaWF0IjoxNTE2MjM5MDIyfQ.8cffnhxieDxB7ufL2Tyckb2k39lgsKrzF3Axp-i4iVc',
        }
      },
    }),
  ],
  session: {
    maxAge: 24 * 60 * 60, // session last for 24 hours
  },
  callbacks: {
    jwt: async ({ token, user }: { token: JWT; user: any }) => {
      // console.log('jwt callback', token)

      if (user) {
        return {
          ...token,
          username: user.username,
          jwt: user.jwt,
          refreshToken: user.refreshToken,
        }
      }

      return token
    },
    session: async ({
      session,
      token,
      user,
    }: {
      session: Session
      token: JWT
      user: AdapterUser
    }) => {
      // console.log('session callback', session)

      if (token) {
        const jwtToken = token.jwt as string
        const decoded = jwtDecode<any>(jwtToken)

        // add extra data to session
        session.user = {
          ...session.user,
          username: decoded.username,
          level: decoded.tipe,
        }
        session.jwt = jwtToken
        session.refreshToken = token.refreshToken as string
      }

      return session
    },
    signIn: async ({
      user,
      account,
      profile,
      email,
      credentials,
    }: {
      user: any
      account: any
      profile?: any
      email?: any
      credentials?: any
    }) => {
      // console.log('signIn callback', credentials)

      return true
    },
  },
  pages: {
    signIn: '/login',
  },
}
