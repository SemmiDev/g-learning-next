'use server'

import { TambahTagihanPenggunaFormSchema } from '@/components/page/admin/tagihan/pengguna/modal/tambah'
import { makeJwtPostRequestAction } from '@/utils/action'

export const tambahTagihanPenggunaAction = async (
  data: TambahTagihanPenggunaFormSchema
) =>
  makeJwtPostRequestAction(`${process.env.API_URL}/admin/tagihan-pengguna`, {
    nomor_invoice: data.nomor,
    tanggal_tagihan: data.tanggal,
    bulan_tagihan: data.bulan?.value,
    tahun_tagihan: data.tahun,
    id_pengguna: data.pengguna?.value,
    id_paket_pengguna: data.paket?.value,
    harga_paket: data.nominal,
  })
