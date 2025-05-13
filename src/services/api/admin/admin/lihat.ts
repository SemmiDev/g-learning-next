import { makeJwtGetRequestApi } from '@/utils/api'

export const lihatAdminApi = async (jwt: string, id: string) =>
  makeJwtGetRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/akun/${id}`,
    jwt
  )
