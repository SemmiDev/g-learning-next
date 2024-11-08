'use server'

import { TambahPembayaranTagihanInstansiFormSchema } from '@/components/page/admin/tagihan/instansi/pembayaran/modal/tambah'
import { makeJwtPostRequestAction } from '@/utils/action'

export const tambahPembayaranTagihanInstansiAction = async (
  idTagihan: string,
  data: TambahPembayaranTagihanInstansiFormSchema
) =>
  makeJwtPostRequestAction(
    `${process.env.API_URL}/admin/tagihan-instansi/${idTagihan}/pembayaran`,
    {
      nomor_pembayaran: data.nomor,
      tanggal_pembayaran: data.tanggal,
      jumlah_pembayaran: data.nominal,
      jenis_pembayaran: 'Manual',
    }
  )
