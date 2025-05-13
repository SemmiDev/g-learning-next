import { UbahTagihanInstansiFormSchema } from '@/components/pages/admin/tagihan/instansi/modal/ubah'
import { makeJwtPutRequestApi } from '@/utils/api'

export const ubahTagihanInstansiApi = async (
  jwt: string,
  id: string,
  data: UbahTagihanInstansiFormSchema
) =>
  makeJwtPutRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/tagihan-instansi/${id}`,
    jwt,
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
