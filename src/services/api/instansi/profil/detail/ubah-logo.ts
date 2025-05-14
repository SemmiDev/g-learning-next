import { makeJwtPutRequestApi } from '@/utils/api'

type DataType = {
  logo: string
}

export const ubahLogoApi = async (jwt: string, formData: FormData) =>
  makeJwtPutRequestApi<DataType>(
    `${process.env.NEXT_PUBLIC_API_URL}/instansi/profil-instansi/logo`,
    jwt,
    formData
  )
