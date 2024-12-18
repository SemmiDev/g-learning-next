import { simpanTokenAction } from '@/actions/pengguna/google-drive/simpan-token'
import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import { GOOGLE_DRIVE_SCOPES } from '@/config/const'
import { routes } from '@/config/routes'
import { google } from 'googleapis'
import { getServerSession } from 'next-auth'
import { notFound, redirect } from 'next/navigation'
import { NextRequest, NextResponse } from 'next/server'

const clientId = process.env.GOOGLE_DRIVE_CLIENT_ID
const secretID = process.env.GOOGLE_DRIVE_CLIENT_SECRET
const redirectUrl = process.env.GOOGLE_DRIVE_REDIRECT_URL

const authenticateGoogle = () => {
  const oauth2Client = new google.auth.OAuth2(clientId, secretID, redirectUrl)

  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: GOOGLE_DRIVE_SCOPES,
    prompt: 'consent',
  })

  redirect(url)
}

const getUserInfo = async (accessToken: string) => {
  const oauth2Client = new google.auth.OAuth2()

  oauth2Client.setCredentials({
    access_token: accessToken,
  })

  const oauth2 = google.oauth2({
    auth: oauth2Client,
    version: 'v2',
  })

  const { data } = await oauth2.userinfo.get()

  return data
}

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code')

  const session = await getServerSession(authOptions)

  if (session?.user?.level !== 'Pengguna') notFound()

  if (code) {
    const oauth2Client = new google.auth.OAuth2(clientId, secretID, redirectUrl)

    const { tokens } = await oauth2Client.getToken(code)

    try {
      const checkedAllScopes = GOOGLE_DRIVE_SCOPES.every((scope) =>
        tokens.scope?.includes(scope)
      )

      if (!checkedAllScopes)
        throw new Error('Permission to all scopes not given', {
          cause: 'SCOPES',
        })

      const accessToken = tokens.access_token

      if (!accessToken) throw new Error('Access token not found')

      const userInfo = await getUserInfo(accessToken)

      if (!userInfo.email || !tokens.refresh_token || !tokens.expiry_date)
        throw new Error('User info not found')

      simpanTokenAction({
        email: userInfo.email,
        accessToken: accessToken,
        refreshToken: tokens.refresh_token,
        expiry: tokens.expiry_date,
      })
    } catch (error) {
      // if (error instanceof Error && error.cause === 'SCOPES') {
      //   return NextResponse.redirect(
      //     new URL(routes.pengguna.pustakaMedia, req.url)
      //   )
      // }
    }

    return NextResponse.redirect(new URL(routes.pengguna.pustakaMedia, req.url))
  } else {
    authenticateGoogle()
  }
}
