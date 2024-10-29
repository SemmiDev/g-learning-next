'use server'

import { UbahPembayaranInstansiFormSchema } from '@/components/page/admin/pembayaran-instansi/modal/ubah'
import { makeJwtPutRequestAction } from '@/utils/action'

export const ubahPembayaranInstansiAction = async (
  id: string,
  data: UbahPembayaranInstansiFormSchema
) =>
  makeJwtPutRequestAction(`${process.env.API_URL}/admin/pembayaran/${id}`, {
    tanggal_pembayaran: data.tanggal,
    nominal: data.nominal,
  })
