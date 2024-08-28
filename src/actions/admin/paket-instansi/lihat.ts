'use server'

import { makeJwtGetRequestAction } from '@/utils/action'

type DataType = {
  id: string
  nama: string
  batas_penyimpanan: number
  batas_pengguna: number
  batas_penyimpanan_pengajar: number
  batas_penyimpanan_peserta: number
  batas_kelas: number
  batas_kelas_pengajar: number
  harga: number
  tipe: string
}

export const lihatPaketInstansiAction = (id: string) =>
  makeJwtGetRequestAction<DataType>(
    `${process.env.API_URL}/admin/paket-instansi/${id}`
  )
