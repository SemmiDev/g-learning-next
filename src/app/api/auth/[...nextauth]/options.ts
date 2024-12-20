import { makeBasicPostRequestAction } from '@/utils/action'
import { jwtDecode } from 'jwt-decode'
import { AuthOptions } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { Session, User } from 'node_modules/next-auth/core/types'

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'normalLogin',
      credentials: {
        username: { label: 'Username', type: 'text ' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req): Promise<User | null> {
        // console.log(credentials)

        const { username, password } = credentials ?? {}

        if (username == 'pengajar@glearning.com') {
          return {
            id: '1',
            name: 'Nama Pengajar',
            username: 'pengajar@glearning.com',
            jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlgiLCJpZF9wZW5nZ3VuYSI6IjEiLCJ1c2VybmFtZSI6InBlbmdhamFyQGdsZWFybmluZy5jb20iLCJ0aXBlIjoiUGVuZ2FqYXIiLCJpc3N1ZWRfYXQiOiIyMDI0LTA4LTIyVDA4OjM0OjA3Ljk4MTg0MDAzNyswNzowMCIsImV4cGlyZWRfYXQiOiIyMDI0LTA4LTIyVDEwOjM0OjA3Ljk4MTg0MDA5NyswNzowMCJ9.xoVt-Sse4UENfMshdGSCY5m8lsqZSI3p-lsFiVn4xNs',
          }
        }

        if (username == 'peserta@glearning.com') {
          return {
            id: '2',
            name: 'Nama Peserta',
            username: 'peserta@glearning.com',
            jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlgiLCJpZF9wZW5nZ3VuYSI6IjEiLCJ1c2VybmFtZSI6InBlc2VydGFAZ2xlYXJuaW5nLmNvbSIsInRpcGUiOiJQZXNlcnRhIiwiaXNzdWVkX2F0IjoiMjAyNC0wOC0yMlQwODozNDowNy45ODE4NDAwMzcrMDc6MDAiLCJleHBpcmVkX2F0IjoiMjAyNC0wOC0yMlQxMDozNDowNy45ODE4NDAwOTcrMDc6MDAifQ.bdLA9sFbXnr5JtV4BQNce1c0ocyykzdYQYczjnu4psQ',
          }
        }

        if (username == 'pengguna@glearning.com') {
          return {
            id: '3',
            name: 'Nama Pengguna',
            username: 'pengguna@glearning.com',
            jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlgiLCJpZF9wZW5nZ3VuYSI6IjMiLCJ1c2VybmFtZSI6InBlbmdndW5hQGdsZWFybmluZy5jb20iLCJ0aXBlIjoiUGVuZ2d1bmFBa2FkZW1payIsImlzc3VlZF9hdCI6IjIwMjQtMTItMjBUMDg6MzQ6MDcuOTgxODQwMDM3KzA3OjAwIiwiZXhwaXJlZF9hdCI6IjIwMjQtMTItMjJUMTA6MzQ6MDcuOTgxODQwMDk3KzA3OjAwIn0.8pseDlliGXzgxv7qSd-oNO_5Zx-G-pTy7pSY71JEWBI',
          }
        }

        // Req to API
        const { success, message, data } = await makeBasicPostRequestAction(
          `${process.env.API_URL}/auth/masuk`,
          {
            email: username,
            kata_sandi: password,
            ip:
              getIp(
                req.headers?.['x-forwarded-for'],
                req.headers?.['x-real-ip']
              ) ?? undefined,
          }
        )

        if (success) {
          const decodedToken = jwtDecode<any>(data?.token?.access_token)

          return {
            id: decodedToken.id_pengguna,
            name: data?.pengguna?.nama,
            username: data?.pengguna?.username,
            image: data?.pengguna?.foto,
            jwt: data?.token?.access_token,
            refreshToken: data?.token?.refresh_token,
          }
        }

        throw new Error(message)
      },
    }),
    CredentialsProvider({
      id: 'withToken',
      credentials: {},
      async authorize(credentials, req): Promise<User | null> {
        const { pengguna, token } = JSON.parse(req.body?.data)

        if (pengguna && token) {
          const decodedToken = jwtDecode<any>(token.access_token)

          return {
            id: decodedToken.id_pengguna,
            name: pengguna.nama,
            username: pengguna.username,
            image: pengguna.foto,
            jwt: token.access_token,
            refreshToken: token.refresh_token,
          }
        }

        return null
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
      async profile(profile) {
        // console.log(profile)

        // Req to API
        const { success, message, data } = await makeBasicPostRequestAction(
          `${process.env.API_URL}/auth/masuk-dengan-google`,
          {
            id_google: profile.sub,
            nama: profile.name,
            email: profile.email,
            foto: profile.picture,
          }
        )

        if (success) {
          const decodedToken = jwtDecode<any>(data?.token?.access_token)

          return {
            id: decodedToken.id_pengguna,
            name: data?.pengguna?.nama,
            username: data?.pengguna?.username,
            image: data?.pengguna?.foto,
            jwt: data?.token?.access_token,
            refreshToken: data?.token?.refresh_token,
          }
        }

        throw new Error(message)
      },
    }),
  ],
  session: {
    maxAge: 24 * 60 * 60, // session last for 24 hours
  },
  callbacks: {
    jwt: async ({
      token,
      user,
      trigger,
      session,
    }: {
      token: JWT
      user: any
      trigger?: 'signIn' | 'signUp' | 'update'
      session?: any
    }) => {
      // console.log('jwt callback', {
      //   token,
      //   user,
      //   trigger,
      //   session,
      // })

      // check external JWT and refresh it
      const jwt = token.jwt as string
      const refreshToken = token.refreshToken as string | null | undefined
      const newToken = await checkJwtAndRefresh(jwt, refreshToken)
      if (newToken) {
        return {
          ...token,
          jwt: newToken.access_token,
          refreshToken: newToken.refresh_token,
        }
      }

      if (trigger === 'update') {
        return {
          ...token,
          ...session,
        }
      }

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
    session: async ({ session, token }: { session: Session; token: JWT }) => {
      // console.log('session callback', { session, token })

      if (token) {
        const jwtToken = token.jwt as string
        const decoded = jwtDecode<any>(jwtToken)

        // add extra data to session
        session.user = {
          ...session.user,
          name: token.name,
          username: decoded.username,
          level: decoded.tipe,
          image: token.picture,
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
    async redirect({ url, baseUrl }) {
      return url
    },
  },
  pages: {
    signIn: '/login',
  },
}

async function checkJwtAndRefresh(jwt: string, refreshToken?: string | null) {
  if (!jwt || !refreshToken) return

  const decodedToken = jwtDecode<any>(jwt ?? '')

  // if JWT for API will not be expired one hour from now
  if (
    Date.now() + 60 * 60 * 1000 < Date.parse(decodedToken?.expired_at) ||
    !refreshToken
  )
    return

  const decodedRefreshToken = jwtDecode<any>(refreshToken ?? '')

  // if refresh token for request new JWT is not expired
  if (Date.now() >= Date.parse(decodedRefreshToken?.expired_at)) return

  const refresh = await makeBasicPostRequestAction(
    `${process.env.API_URL}/auth/perbarui-akses-token`,
    {
      refresh_token: refreshToken,
    }
  )
  // console.log('result refresh', refresh)

  if (!refresh.success) return

  return refresh.data?.token
}

function getIp(forwardedFor: string | undefined, realIp: string | undefined) {
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim()
  }

  if (realIp) return realIp.trim()

  return null
}
