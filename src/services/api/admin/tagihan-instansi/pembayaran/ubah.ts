import { UbahPembayaranTagihanInstansiFormSchema } from '@/components/pages/admin/tagihan/instansi/pembayaran/modal/ubah'
import { makeJwtPutRequestApi } from '@/utils/api'

export const ubahPembayaranTagihanInstansiApi = async (
  jwt: string,
  idTagihan: string,
  id: string,
  data: UbahPembayaranTagihanInstansiFormSchema
) =>
  makeJwtPutRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/tagihan-instansi/${idTagihan}/pembayaran/${id}`,
    jwt,
    {
      nomor_pembayaran: data.nomor,
      tanggal_pembayaran: data.tanggal,
      jumlah_pembayaran: data.nominal,
    }
  )
