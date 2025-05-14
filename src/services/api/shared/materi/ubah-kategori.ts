import { UbahKategoriFormSchema } from '@/components/shared/materi/modal/ubah-kategori'
import { makeJwtPutRequestApi } from '@/utils/api'

export const ubahKategoriMateriApi = async (
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
