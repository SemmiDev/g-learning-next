import { makeJwtDeleteRequestApi } from '@/utils/api'

export const disconnectZoomApi = async (jwt: string) =>
  makeJwtDeleteRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/oauth/conferences/zoom`,
    jwt
  )
