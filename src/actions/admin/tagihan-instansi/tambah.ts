'use server'

import { TambahTagihanInstansiFormSchema } from '@/components/page/admin/tagihan/instansi/modal/tambah'
import { makeJwtPostRequestAction } from '@/utils/action'

export const tambahTagihanInstansiAction = async (
  data: TambahTagihanInstansiFormSchema
) =>
  makeJwtPostRequestAction(`${process.env.API_URL}/admin/tagihan-instansi`, {
    nomor_invoice: data.nomor,
    tanggal_tagihan: data.tanggal,
    bulan_tagihan: data.bulan?.value,
    tahun_tagihan: data.tahun,
    id_instansi: data.instansi?.value,
    id_paket: data.paket?.value,
    harga_paket: data.nominal,
  })
