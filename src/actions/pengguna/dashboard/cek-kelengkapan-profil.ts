'use server'

import { makeJwtGetRequestAction } from '@/utils/action'

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
  created_at: string
  updated_at: string
  instansi: string[]
  email: {
    id: string
    email: string
  }[]
}

export const cekKelengkapanProfilAction = () =>
  makeJwtGetRequestAction<DataType>(`${process.env.API_URL}/pengguna`)
