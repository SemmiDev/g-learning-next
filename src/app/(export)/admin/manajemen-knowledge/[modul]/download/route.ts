import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ modul: string }> }
) {
  const session = await getServerSession(authOptions)

  const searchParams = req.nextUrl.searchParams
  const filename = searchParams.get('file')

  const { modul: idModul } = await params

  try {
    const response = await fetch(
      `${process.env.API_URL}/admin/knowledge/modul/${idModul}/export?access_token=${session?.jwt}`
    )

    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${response.statusText}`)
    }

    const headers = new Headers(response.headers)
    headers.set('Content-Disposition', `inline; filename="${filename}"`)
    headers.set(
      'Content-Type',
      response.headers.get('content-type') || 'application/octet-stream'
    )

    return new NextResponse(response.body, {
      status: 200,
      headers,
    })
  } catch (error) {
    return NextResponse.json({ error: 'File not found.' }, { status: 404 })
  }
}
