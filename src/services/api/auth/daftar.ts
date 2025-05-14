import { DaftarFormSchema } from '@/components/pages/auth/daftar/form'
import { makeBasicPostRequestAction } from '@/utils/action'
import { getIp } from '@/utils/ip'

export const daftarApi = async (data: DaftarFormSchema) =>
  makeBasicPostRequestAction(`${process.env.NEXT_PUBLIC_API_URL}/auth/daftar`, {
    nama: data.nama,
    email: data.email,
    kata_sandi: data.password,
    ulangi_kata_sandi: data.ulangiPassword,
    ip: (await getIp()) ?? undefined,
  })
