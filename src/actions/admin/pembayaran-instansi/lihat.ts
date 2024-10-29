'use server'

import { makeJwtGetRequestAction } from '@/utils/action'

type DataType = {
  id: string
  id_instansi: string
  id_paket_instansi: string
  tanggal_pembayaran: string
  nominal: number
  nomor_pesanan: string
  nomor_invoice: string
  status: string
  jenis_pembayaran: string
  nama_instansi: string
  nama_paket: string
}

export const lihatPembayaranInstansiAction = async (id: string) =>
  makeJwtGetRequestAction<DataType>(
    `${process.env.API_URL}/admin/pembayaran/${id}`
  )
