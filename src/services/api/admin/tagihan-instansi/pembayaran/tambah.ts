import { TambahPembayaranTagihanInstansiFormSchema } from '@/components/pages/admin/tagihan/instansi/pembayaran/modal/tambah'
import { makeJwtPostRequestApi } from '@/utils/api'

export const tambahPembayaranTagihanInstansiApi = async (
  jwt: string,
  idTagihan: string,
  data: TambahPembayaranTagihanInstansiFormSchema
) =>
  makeJwtPostRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/tagihan-instansi/${idTagihan}/pembayaran`,
    jwt,
    {
      nomor_pembayaran: data.nomor,
      tanggal_pembayaran: data.tanggal,
      jumlah_pembayaran: data.nominal,
      jenis_pembayaran: 'Manual',
    }
  )
