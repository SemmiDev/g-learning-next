'use server'

import { makeJwtPostRequestAction } from '@/utils/action'

export const tambahPembayaranTagihanPenggunaAction = async (
  idTagihan: string,
  data: unknown
) =>
  makeJwtPostRequestAction(
    `${process.env.API_URL}/admin/tagihan-pengguna/${idTagihan}/pembayaran`,
    {
      // nomor_pembayaran: data.nomor,
      // tanggal_pembayaran: data.tanggal,
      // jumlah_pembayaran: data.nominal,
      // jenis_pembayaran: 'Manual',
    }
  )
