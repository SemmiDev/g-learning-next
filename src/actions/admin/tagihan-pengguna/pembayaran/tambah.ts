'use server'

import { TambahPembayaranTagihanPenggunaFormSchema } from '@/components/page/admin/tagihan/pengguna/pembayaran/modal/tambah'
import { makeJwtPostRequestAction } from '@/utils/action'

export const tambahPembayaranTagihanPenggunaAction = async (
  idTagihan: string,
  data: TambahPembayaranTagihanPenggunaFormSchema
) =>
  makeJwtPostRequestAction(
    `${process.env.API_URL}/admin/tagihan-pengguna/${idTagihan}/pembayaran`,
    {
      nomor_pembayaran: data.nomor,
      tanggal_pembayaran: data.tanggal,
      jumlah_pembayaran: data.nominal,
      jenis_pembayaran: 'Manual',
    }
  )
