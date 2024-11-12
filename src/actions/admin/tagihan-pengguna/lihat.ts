'use server'

import { makeJwtGetRequestAction } from '@/utils/action'

type DataType = {
  id: string
  id_instansi: null
  id_pengguna: string
  id_paket_instansi: null
  id_paket_pengguna: string
  nomor_invoice: string
  total_tagihan: number
  tanggal_tagihan: string
  bulan_tagihan: number
  tahun_tagihan: number
  status_tagihan: 'Belum Lunas' | 'Lunas'
  jatuh_tempo: string
  created_at: string
  updated_at: string
  nama_pengguna: string
  nama_paket: string
  jenis_paket: 'Default' | 'Custom'
  total_pembayaran: number
}

export const lihatTagihanPenggunaAction = async (id: string) =>
  makeJwtGetRequestAction<DataType>(
    `${process.env.API_URL}/admin/tagihan-pengguna/${id}`
  )
