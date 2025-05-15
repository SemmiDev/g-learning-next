import { makeJwtPostRequestApi } from '@/utils/api'

export const keluarKelasApi = async (jwt: string, id: string) =>
  makeJwtPostRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/kelas-publik/${id}/keluar`,
    jwt
  )
