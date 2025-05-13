import { TambahTagihanPenggunaFormSchema } from '@/components/pages/admin/tagihan/pengguna/modal/tambah'
import { makeJwtPostRequestApi } from '@/utils/api'

export const tambahTagihanPenggunaApi = async (
  jwt: string,
  data: TambahTagihanPenggunaFormSchema
) =>
  makeJwtPostRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/tagihan-pengguna`,
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
