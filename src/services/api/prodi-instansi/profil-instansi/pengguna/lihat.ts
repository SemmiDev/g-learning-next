import { makeJwtGetRequestApi } from '@/utils/api'

type DataType = {
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
  diblokir: number
  keterangan_blokir: string
  tanggal_blokir: string
  email: string
  instansi: string[]
  paket: string[]
  jenis_akun: string[]
}

export const lihatPenggunaApi = async (jwt: string, id: string) =>
  makeJwtGetRequestApi<DataType>(
    `${process.env.NEXT_PUBLIC_API_URL}/prodi/pengguna/${id}`,
    jwt
  )
