import { makeJwtPutRequestAction } from '@/utils/action'

type DataType = {
  logo: string
}

export const ubahLogoAction = async (formData: FormData) =>
  makeJwtPutRequestAction<DataType>(
    `${process.env.NEXT_PUBLIC_API_URL}/instansi/profil-instansi/logo`,
    formData
  )
