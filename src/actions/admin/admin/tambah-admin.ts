'use server'

import { TambahAdminFormSchema } from '@/components/page/admin/manajemen-admin/modal/tambah'
import { makeJwtPostRequestAction } from '@/utils/action'

export const tambahAdminAction = (data: TambahAdminFormSchema) =>
  makeJwtPostRequestAction(`${process.env.API_URL}/admin/akun`, {
    username: data.username,
    nama: data.nama,
    kata_sandi: data.password,
    ulangi_kata_sandi: data.ulangiPassword,
  })
