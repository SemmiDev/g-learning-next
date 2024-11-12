'use server'

import { makeJwtGetRequestAction } from '@/utils/action'

type DataType = {
  id: string
  nama: string
  batas_penyimpanan: number
  batas_kelas: number
  batas_anggota_kelas: number
  tipe: 'Default' | 'Custom'
  harga: number
  created_at: string
  updated_at: string
}

export const lihatDetailPaketPenggunaAction = async (id: string) =>
  makeJwtGetRequestAction<DataType>(
    `${process.env.API_URL}/admin/pengguna/${id}/paket`
  )
