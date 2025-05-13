import { UbahPembayaranTagihanPenggunaFormSchema } from '@/components/pages/admin/tagihan/pengguna/pembayaran/modal/ubah'
import { makeJwtPutRequestApi } from '@/utils/api'

export const ubahPembayaranTagihanPenggunaApi = async (
  jwt: string,
  idTagihan: string,
  id: string,
  data: UbahPembayaranTagihanPenggunaFormSchema
) =>
  makeJwtPutRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/tagihan-pengguna/${idTagihan}/pembayaran/${id}`,
    jwt,
    {
      nomor_pembayaran: data.nomor,
      tanggal_pembayaran: data.tanggal,
      jumlah_pembayaran: data.nominal,
    }
  )
