'use server'

import { UbahAdminFormSchema } from '@/components/page/admin/manajemen-admin/modal/ubah'
import { makeJwtPutRequestAction } from '@/utils/action'

export const ubahAdminAction = async (id: string, data: UbahAdminFormSchema) =>
  makeJwtPutRequestAction(`${process.env.API_URL}/admin/akun/${id}`, {
    username: data.username,
    nama: data.nama,
    kata_sandi: data.password ?? undefined,
    ulangi_kata_sandi: data.ulangiPassword ?? undefined,
  })
