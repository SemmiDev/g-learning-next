import { makeJwtGetRequestApi } from '@/utils/api'

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

export const lihatPembayaranTagihanPenggunaApi = async (
  jwt: string,
  idTagihan: string,
  id: string
) =>
  makeJwtGetRequestApi<DataType>(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/tagihan-pengguna/${idTagihan}/pembayaran/${id}`,
    jwt
  )
