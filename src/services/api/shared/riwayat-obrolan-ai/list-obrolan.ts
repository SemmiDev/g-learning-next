import { makeJwtGetRequestTableApi } from '@/utils/api'

export type DataType = {
  id: string
  id_pengguna: string
  id_sesi_chat: string
  isi: string
  is_pengguna: boolean
  created_at: string
  updated_at: string
}

export const listObrolanAiApi = async ({
  jwt,
  id,
  page = 1,
}: {
  jwt: string
  id: string
  page?: number
}) =>
  makeJwtGetRequestTableApi<DataType>(
    `${process.env.NEXT_PUBLIC_API_URL}/ai/chat/${id}/pesan`,
    jwt,
    {
      current_page: page,
      per_page: 20,
    }
  )
