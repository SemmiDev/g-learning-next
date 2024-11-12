'use server'

import { makeJwtPutRequestAction } from '@/utils/action'

export const ubahPembayaranTagihanPenggunaAction = async (
  idTagihan: string,
  id: string,
  data: unknown
) =>
  makeJwtPutRequestAction(
    `${process.env.API_URL}/admin/tagihan-pengguna/${idTagihan}/pembayaran/${id}`,
    {
      // nomor_pembayaran: data.nomor,
      // tanggal_pembayaran: data.tanggal,
      // jumlah_pembayaran: data.nominal,
    }
  )
