import { UbahKategoriFormSchema } from '@/components/pages/pengguna/bank-soal/modal/ubah-kategori'
import { makeJwtPutRequestApi } from '@/utils/api'

export const ubahKategoriBankSoalApi = async (
  jwt: string,
  id: string,
  data: UbahKategoriFormSchema
) =>
  makeJwtPutRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/kategori-bank-soal/${id}`,
    jwt,
    {
      nama_kategori: data.nama,
    }
  )
