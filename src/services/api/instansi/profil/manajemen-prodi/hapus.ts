import { makeJwtDeleteRequestApi } from '@/utils/api'

export const hapusAdminProdiApi = async (jwt: string, id: string) =>
  makeJwtDeleteRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/instansi/akun-prodi/${id}`,
    jwt
  )
