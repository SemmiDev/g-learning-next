import { makeJwtDeleteRequestApi } from '@/utils/api'

export const hapusAdminApi = async (jwt: string, id: string) =>
  makeJwtDeleteRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/akun/${id}`,
    jwt
  )
