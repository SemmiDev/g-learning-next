'use server'

import { UbahPembayaranTagihanPenggunaFormSchema } from '@/components/page/admin/tagihan/pengguna/pembayaran/modal/ubah'
import { makeJwtPutRequestAction } from '@/utils/action'

export const ubahPembayaranTagihanPenggunaAction = async (
  idTagihan: string,
  id: string,
  data: UbahPembayaranTagihanPenggunaFormSchema
) =>
  makeJwtPutRequestAction(
    `${process.env.API_URL}/admin/tagihan-pengguna/${idTagihan}/pembayaran/${id}`,
    {
      nomor_pembayaran: data.nomor,
      tanggal_pembayaran: data.tanggal,
      jumlah_pembayaran: data.nominal,
    }
  )
