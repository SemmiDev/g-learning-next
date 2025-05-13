import { UbahAdminFormSchema } from '@/components/pages/admin/manajemen-admin/modal/ubah'
import { makeJwtPutRequestApi } from '@/utils/api'

export const ubahAdminApi = async (
  jwt: string,
  id: string,
  data: UbahAdminFormSchema
) =>
  makeJwtPutRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/akun/${id}`,
    jwt,
    {
      username: data.username,
      nama: data.nama,
      kata_sandi: data.password ?? undefined,
      ulangi_kata_sandi: data.ulangiPassword ?? undefined,
    }
  )
