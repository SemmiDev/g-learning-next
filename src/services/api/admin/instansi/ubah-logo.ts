import { makeJwtPutRequestApi } from '@/utils/api'

export const ubahLogoApi = async (
  jwt: string,
  id: string,
  formData: FormData
) =>
  makeJwtPutRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/instansi/${id}/logo`,
    jwt,
    formData
  )
