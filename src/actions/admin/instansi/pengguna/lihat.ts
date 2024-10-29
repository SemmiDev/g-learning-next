'use server'

import { makeJwtGetRequestAction } from '@/utils/action'

type DataType = {
  id_pengguna_instansi: string
  nama: string
  tipe: string
  foto: string
  bio: string
  username: string
  hp: string
  email: string
  situs_web: string
  jenis_kelamin: string
  paket: string
}

export const lihatPenggunaInstansiAction = async (
  idInstansi: string,
  idPengguna: string
) =>
  makeJwtGetRequestAction<DataType>(
    `${process.env.API_URL}/admin/instansi/${idInstansi}/anggota/${idPengguna}`
  )
