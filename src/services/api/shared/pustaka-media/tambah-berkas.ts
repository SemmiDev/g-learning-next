import { makeJwtPostRequestApi } from '@/utils/api'

export const tambahBerkasApi = async (jwt: string, formData: FormData) =>
  makeJwtPostRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/pustaka-media/berkas`,
    jwt,
    formData
  )
