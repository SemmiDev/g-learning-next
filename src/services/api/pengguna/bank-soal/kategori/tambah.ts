import { TambahKategoriFormSchema } from '@/components/pages/pengguna/bank-soal/modal/tambah-kategori'
import { makeJwtPostRequestAction } from '@/utils/action'

export const tambahKategoriBankSoalAction = async (
  data: TambahKategoriFormSchema
) =>
  makeJwtPostRequestAction(
    `${process.env.NEXT_PUBLIC_API_URL}/kategori-bank-soal`,
    {
      nama_kategori: data.nama,
    }
  )
