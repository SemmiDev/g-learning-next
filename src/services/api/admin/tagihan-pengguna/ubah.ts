import { UbahTagihanPenggunaFormSchema } from '@/components/pages/admin/tagihan/pengguna/modal/ubah'
import { makeJwtPutRequestApi } from '@/utils/api'

export const ubahTagihanPenggunaApi = async (
  jwt: string,
  id: string,
  data: UbahTagihanPenggunaFormSchema
) =>
  makeJwtPutRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/tagihan-pengguna/${id}`,
    jwt,
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
