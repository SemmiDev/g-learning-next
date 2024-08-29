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
  diblokir: number
  keterangan_blokir: string
  tanggal_blokir: string
  instansi: string
  paket: string
  jenis_akun: string
}

export const lihatPenggunaInstansiAction = (id: string) =>
  makeJwtGetRequestAction<DataType>(
    `${process.env.API_URL}/admin/profil-pengguna/${id}`
  )
