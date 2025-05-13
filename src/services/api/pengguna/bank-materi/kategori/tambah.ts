import { TambahKategoriFormSchema } from '@/components/pages/pengguna/bank-materi/modal/tambah-kategori'
import { makeJwtPostRequestAction } from '@/utils/action'

export const tambahKategoriBankMateriAction = async (
  data: TambahKategoriFormSchema
) =>
  makeJwtPostRequestAction(
    `${process.env.NEXT_PUBLIC_API_URL}/kategori-bank-ajar`,
    {
      nama_kategori: data.nama,
    }
  )
