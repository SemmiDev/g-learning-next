import { TambahKategoriFormSchema } from '@/components/pages/pengguna/bank-soal/modal/tambah-kategori'
import { makeJwtPostRequestApi } from '@/utils/api'

export const tambahKategoriBankSoalApi = async (
  jwt: string,
  data: TambahKategoriFormSchema
) =>
  makeJwtPostRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/kategori-bank-soal`,
    jwt,
    {
      nama_kategori: data.nama,
    }
  )
