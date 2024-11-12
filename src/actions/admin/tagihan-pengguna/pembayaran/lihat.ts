'use server'

import { makeJwtGetRequestAction } from '@/utils/action'

type DataType = {
  id: string
  id_tagihan: string
  tanggal_pembayaran: string
  jumlah_pembayaran: number
  nomor_pembayaran: string
  jenis_pembayaran: 'Manual' | 'Winpay' | 'Lainnya'
  created_at: string
  updated_at: string
}

export const lihatPembayaranTagihanPenggunaAction = async (
  idTagihan: string,
  id: string
) =>
  makeJwtGetRequestAction<DataType>(
    `${process.env.API_URL}/admin/tagihan-pengguna/${idTagihan}/pembayaran/${id}`
  )
