'use server'

import { UbahTagihanInstansiFormSchema } from '@/components/page/admin/tagihan/instansi/modal/ubah'
import { makeJwtPutRequestAction } from '@/utils/action'

export const ubahTagihanInstansiAction = async (
  id: string,
  data: UbahTagihanInstansiFormSchema
) =>
  makeJwtPutRequestAction(
    `${process.env.API_URL}/admin/tagihan-instansi/${id}`,
    {
      nomor_invoice: data.nomor,
      tanggal_tagihan: data.tanggal,
      bulan_tagihan: data.bulan?.value,
      tahun_tagihan: data.tahun,
      id_instansi: data.instansi?.value,
      id_paket: data.paket?.value,
      harga_paket: data.nominal,
    }
  )
