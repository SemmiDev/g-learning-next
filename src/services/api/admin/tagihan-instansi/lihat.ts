import { makeJwtGetRequestApi } from '@/utils/api'

export type DataType = {
  id: string
  id_instansi: string
  id_paket_instansi: string
  id_paket_pengguna: null
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
  jenis_paket: 'Default' | 'Custom'
  total_pembayaran: number
}

export const lihatTagihanInstansiApi = async (jwt: string, id: string) =>
  makeJwtGetRequestApi<DataType>(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/tagihan-instansi/${id}`,
    jwt
  )
