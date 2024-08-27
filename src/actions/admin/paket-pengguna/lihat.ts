'use server'

import { makeJwtGetRequestAction } from '@/utils/action'

type DataType = {
  id: string
  nama: string
  batas_penyimpanan: number
  batas_kelas: number
  batas_anggota_kelas: number
  harga: number
}

export const lihatPaketPenggunaAction = (id: string) =>
  makeJwtGetRequestAction<DataType>(
    `${process.env.API_URL}/paket-pengguna/${id}`
  )
