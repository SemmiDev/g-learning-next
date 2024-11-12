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
  tipe: 'Default' | 'Custom'
  created_at: string
  updated_at: string
}

export const lihatPaketInstansiAction = async (id: string) =>
  makeJwtGetRequestAction<DataType>(
    `${process.env.API_URL}/admin/paket-instansi/${id}`
  )
