import { makeJwtDeleteRequestApi } from '@/utils/api'

export const disconnectGoogleMeetApi = async (jwt: string) =>
  makeJwtDeleteRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/oauth/conferences/google-meet`,
    jwt
  )
