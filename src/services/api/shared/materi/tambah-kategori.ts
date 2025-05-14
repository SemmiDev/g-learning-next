import { TambahKategoriFormSchema } from '@/components/shared/materi/modal/tambah-kategori'
import { makeJwtPostRequestApi } from '@/utils/api'

export const tambahKategoriMateriApi = async (
  jwt: string,
  data: TambahKategoriFormSchema
) =>
  makeJwtPostRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/kategori-bank-ajar`,
    jwt,
    {
      nama_kategori: data.nama,
    }
  )
