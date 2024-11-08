'use server'

import { UbahPembayaranTagihanInstansiFormSchema } from '@/components/page/admin/tagihan/instansi/pembayaran/modal/ubah'
import { makeJwtPutRequestAction } from '@/utils/action'

export const ubahPembayaranTagihanInstansiAction = async (
  idTagihan: string,
  id: string,
  data: UbahPembayaranTagihanInstansiFormSchema
) =>
  makeJwtPutRequestAction(
    `${process.env.API_URL}/admin/tagihan-instansi/${idTagihan}/pembayaran/${id}`,
    {
      nomor_pembayaran: data.nomor,
      tanggal_pembayaran: data.tanggal,
      jumlah_pembayaran: data.nominal,
    }
  )
