import { UbahKategoriFormSchema } from '@/components/pages/pengguna/bank-materi/modal/ubah-kategori'
import { makeJwtPutRequestAction } from '@/utils/action'

export const ubahKategoriBankMateriAction = async (
  id: string,
  data: UbahKategoriFormSchema
) =>
  makeJwtPutRequestAction(
    `${process.env.NEXT_PUBLIC_API_URL}/kategori-bank-ajar/${id}`,
    {
      nama_kategori: data.nama,
    }
  )
