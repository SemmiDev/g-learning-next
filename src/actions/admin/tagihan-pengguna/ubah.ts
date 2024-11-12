'use server'

import { UbahTagihanPenggunaFormSchema } from '@/components/page/admin/tagihan/pengguna/modal/ubah'
import { makeJwtPutRequestAction } from '@/utils/action'

export const ubahTagihanPenggunaAction = async (
  id: string,
  data: UbahTagihanPenggunaFormSchema
) =>
  makeJwtPutRequestAction(
    `${process.env.API_URL}/admin/tagihan-pengguna/${id}`,
    {
      nomor_invoice: data.nomor,
      tanggal_tagihan: data.tanggal,
      bulan_tagihan: data.bulan?.value,
      tahun_tagihan: data.tahun,
      id_pengguna: data.pengguna?.value,
      id_paket_pengguna: data.paket?.value,
      harga_paket: data.nominal,
    }
  )
