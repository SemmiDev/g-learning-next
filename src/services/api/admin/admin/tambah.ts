import { TambahAdminFormSchema } from '@/components/pages/admin/manajemen-admin/modal/tambah'
import { makeJwtPostRequestApi } from '@/utils/api'

export const tambahAdminApi = async (
  jwt: string,
  data: TambahAdminFormSchema
) =>
  makeJwtPostRequestApi(`${process.env.NEXT_PUBLIC_API_URL}/admin/akun`, jwt, {
    username: data.username,
    nama: data.nama,
    kata_sandi: data.password,
    ulangi_kata_sandi: data.ulangiPassword,
  })
