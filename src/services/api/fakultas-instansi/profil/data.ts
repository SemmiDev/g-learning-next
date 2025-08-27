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
  kuota_upload: string
  foto: string
  terakhir_login: string
  created_at: string
  updated_at: string
  instansi: string[]
  email: { id: string; email: string }[]
}

export const dataProfilApi = async (jwt: string) =>
  makeJwtGetRequestApi<DataType>(
    `${process.env.NEXT_PUBLIC_API_URL}/pengguna`,
    jwt
  )
