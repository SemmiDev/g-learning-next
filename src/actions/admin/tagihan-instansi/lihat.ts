'use server'

import { makeJwtGetRequestAction } from '@/utils/action'

type DataType = {
  id: string
  id_instansi: string
  id_paket_instansi: string
  id_paket_pengguna: string | null
  nomor_invoice: string
  total_tagihan: number
  tanggal_tagihan: string
  bulan_tagihan: number
  tahun_tagihan: number
  status_tagihan: 'Belum Lunas' | 'Lunas'
  jatuh_tempo: string
  created_at: string
  updated_at: string
  nama_instansi: string
  nama_paket: string
  jenis_paket: string
  total_pembayaran: number
}

export const lihatTagihanInstansiAction = async (id: string) =>
  makeJwtGetRequestAction<DataType>(
    `${process.env.API_URL}/admin/tagihan-instansi/${id}`
  )
