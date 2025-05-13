import { TambahPembayaranTagihanPenggunaFormSchema } from '@/components/pages/admin/tagihan/pengguna/pembayaran/modal/tambah'
import { makeJwtPostRequestApi } from '@/utils/api'

export const tambahPembayaranTagihanPenggunaApi = async (
  jwt: string,
  idTagihan: string,
  data: TambahPembayaranTagihanPenggunaFormSchema
) =>
  makeJwtPostRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/tagihan-pengguna/${idTagihan}/pembayaran`,
    jwt,
    {
      nomor_pembayaran: data.nomor,
      tanggal_pembayaran: data.tanggal,
      jumlah_pembayaran: data.nominal,
      jenis_pembayaran: 'Manual',
    }
  )
