import { UbahKategoriFormSchema } from '@/components/shared/paket-soal/modal/ubah-kategori'
import { makeJwtPutRequestApi } from '@/utils/api'

export const ubahKategoriSoalApi = async (
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
