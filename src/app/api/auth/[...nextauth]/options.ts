import { makeBasicPostRequestAction } from '@/utils/action'
import { getIp } from '@/utils/ip'
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
            jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsZXZlbCI6IlBlbmdhamFyIiwiaWF0IjoxNTE2MjM5MDIyfQ.8cffnhxieDxB7ufL2Tyckb2k39lgsKrzF3Axp-i4iVc',
          }
        }

        if (username == 'peserta@glearning.com') {
          return {
            id: '2',
            name: 'Nama Peserta',
            username: 'peserta@glearning.com',
            jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsZXZlbCI6IlBlc2VydGEiLCJpYXQiOjE1MTYyMzkwMjJ9.MhaAQ43OFkJrznl-J37Wt30JACuMZLhRdcRpgkl0mhA',
          }
        }

        if (username == 'admin@glearning.com') {
          return {
            id: '3',
            name: 'Nama Admin',
            username: 'admin@glearning.com',
            jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsZXZlbCI6IkFkbWluIiwiaWF0IjoxNTE2MjM5MDIyfQ.Vq_GAU2EbhVQO386WazO6cgxvDDf8Ne9_IZkOsFRzvs',
          }
        }

        if (username == 'instansi@glearning.com') {
          return {
            id: '4',
            name: 'Nama Admin Instansi',
            username: 'instansi@glearning.com',
            jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsZXZlbCI6Ikluc3RhbnNpIiwiaWF0IjoxNTE2MjM5MDIyfQ.tqIFPLQoImOa13tTuGmM4TQdwFqAfk_-laBhgPryI1w',
          }
        }

        // Req to API
        const { success, message, data } = await makeBasicPostRequestAction(
          `${process.env.API_URL}/auth/masuk`,
          {
            email: username,
            kata_sandi: password,
            ip: getIp() ?? undefined,
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

        console.log(pengguna)

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

async function checkJwtAndRefresh(jwt: string, refreshToken?: string | null) {
  if (!jwt || !refreshToken) return

  const decodedToken = jwtDecode<any>(jwt ?? '')

  // if JWT for API will be expired one hour from now
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
  console.log('result refresh', refresh)

  if (!refresh.success) return

  return refresh.data?.token
}
