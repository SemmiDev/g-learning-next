import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import { routes } from '@/config/routes'
import { simpanTokenAction } from '@/services/actions/admin/zoom/simpan-token'
import { getServerSession } from 'next-auth'
import { notFound } from 'next/navigation'
import { NextRequest, NextResponse } from 'next/server'

const clientId = process.env.ZOOM_CLIENT_ID
const secretID = process.env.ZOOM_CLIENT_SECRET
const redirectUrl = process.env.ZOOM_REDIRECT_URL

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code')

  const session = await getServerSession(authOptions)

  if (session?.user?.level !== 'Admin') notFound()

  if (code) {
    try {
      const response = await fetch('https://zoom.us/oauth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${Buffer.from(
            `${clientId}:${secretID}`
          ).toString('base64')}`,
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          code: code,
          redirect_uri: redirectUrl || '',
        }),
      })
      const tokens: {
        access_token?: string
        token_type?: string
        refresh_token?: string
        expires_in?: number
        scope?: string
      } = await response.json()

      if (!tokens.access_token || !tokens.refresh_token)
        throw new Error('Access token not found')

      await simpanTokenAction({
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
        expiry: tokens.expires_in || 0,
      })
    } catch (error) {}
  }

  return NextResponse.redirect(
    new URL(routes.admin.koneksiAkun, process.env.NEXT_URL)
  )
}
