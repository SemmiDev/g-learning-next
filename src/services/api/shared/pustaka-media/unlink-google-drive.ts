import { makeJwtDeleteRequestApi } from '@/utils/api'

export const unlinkGoogleDriveApi = async (jwt: string) =>
  makeJwtDeleteRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/oauth/google-drive`,
    jwt
  )
