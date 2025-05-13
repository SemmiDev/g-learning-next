import { TambahTagihanInstansiFormSchema } from '@/components/pages/admin/tagihan/instansi/modal/tambah'
import { makeJwtPostRequestApi } from '@/utils/api'

export const tambahTagihanInstansiApi = async (
  jwt: string,
  data: TambahTagihanInstansiFormSchema
) =>
  makeJwtPostRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/tagihan-instansi`,
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
