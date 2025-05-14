import { UbahKategoriFormSchema } from '@/components/pages/pengguna/bank-materi/modal/ubah-kategori'
import { makeJwtPutRequestApi } from '@/utils/api'

export const ubahKategoriBankMateriApi = async (
  jwt: string,
  id: string,
  data: UbahKategoriFormSchema
) =>
  makeJwtPutRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/kategori-bank-ajar/${id}`,
    jwt,
    {
      nama_kategori: data.nama,
    }
  )
