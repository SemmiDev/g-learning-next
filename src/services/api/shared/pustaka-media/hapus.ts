import { makeJwtDeleteRequestApi } from '@/utils/api'

export const hapusBerkasApi = async (jwt: string, id: string) =>
  makeJwtDeleteRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/pustaka-media`,
    jwt,
    {
      id: [id],
    }
  )
