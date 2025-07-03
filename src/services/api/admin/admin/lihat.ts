import { makeJwtGetRequestApi } from '@/utils/api'

export type DataType = {
  id: string
  username: string
  tipe: string
  nik: string
  nama: string
  jenis_kelamin: string
  bio: string
  hp: string
  situs_web: string
  kuota_upload: number
  foto: string
  terakhir_login: string
  created_at: string
  updated_at: string
}

export const lihatAdminApi = async (jwt: string, id: string) =>
  makeJwtGetRequestApi<DataType>(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/akun/${id}`,
    jwt
  )
