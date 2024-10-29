'use server'

import { DaftarFormSchema } from '@/components/page/auth/daftar/form'
import { makeBasicPostRequestAction } from '@/utils/action'
import { getIp } from '@/utils/ip'

export const daftarAction = async (data: DaftarFormSchema) =>
  makeBasicPostRequestAction(`${process.env.API_URL}/auth/daftar`, {
    nama: data.nama,
    email: data.email,
    kata_sandi: data.password,
    ulangi_kata_sandi: data.ulangiPassword,
    ip: getIp() ?? undefined,
  })
