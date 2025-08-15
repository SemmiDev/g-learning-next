import { makeJwtGetRequestApi } from '@/utils/api'

export type DataType = {
  id: string
  nama: string
  username: string
  email: string
  terakhir_login: string | null
  id_sms: string
  nm_lemb: string
  nm_lemb_inggris: string | null
  nm_jenj_didik: string
  tipe: 'Prodi' | 'Fakultas'
}

export const lihatAdminProdiApi = async (jwt: string, id: string) =>
  makeJwtGetRequestApi<DataType>(
    `${process.env.NEXT_PUBLIC_API_URL}/instansi/akun-prodi/${id}`,
    jwt
  )
