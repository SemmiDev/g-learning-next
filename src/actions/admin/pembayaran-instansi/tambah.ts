'use server'

import { TambahPembayaranInstansiFormSchema } from '@/components/page/admin/pembayaran-instansi/modal/tambah'
import { makeJwtPostRequestAction } from '@/utils/action'

export const tambahPembayaranInstansiAction = async (
  data: TambahPembayaranInstansiFormSchema
) =>
  makeJwtPostRequestAction(`${process.env.API_URL}/admin/pembayaran`, {
    nomor_pesanan: data.pesanan,
    id_instansi: data.instansi?.value,
    tanggal_pembayaran: data.tanggal,
    nominal: data.nominal,
  })
