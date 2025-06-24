import { makeJwtDeleteRequestApi } from '@/utils/api'

export const hapusRiwayatObrolanAiApi = async (jwt: string, id: string) =>
  makeJwtDeleteRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/ai/chat/${id}`,
    jwt
  )
