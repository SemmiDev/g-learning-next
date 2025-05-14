import { ControlledAsyncTableApiProps } from '@/components/ui/controlled-async-table'
import { makeJwtGetRequestTableApi } from '@/utils/api'

export type DataType = {
  id: string
  id_instansi: string
  id_pengguna: null
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
  id_pembayaran: string
  id_tagihan: string
  tanggal_pembayaran: string
  jumlah_pembayaran: number
  nomor_tagihan: string
  nomor_pembayaran: string
  jenis_pembayaran: 'Manual' | 'Winpay' | 'Lainnya'
}

export const tableRiwayatPembayaranApi = async ({
  jwt,
  page = 1,
  search = '',
  sort,
}: ControlledAsyncTableApiProps) =>
  makeJwtGetRequestTableApi<DataType>(
    `${process.env.NEXT_PUBLIC_API_URL}/instansi/riwayat-pembayaran`,
    jwt,
    {
      current_page: page,
      keyword: search,
      sort_by: sort?.name,
      order: sort?.order,
    }
  )
