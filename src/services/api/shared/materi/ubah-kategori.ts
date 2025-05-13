import { UbahKategoriFormSchema } from '@/components/shared/materi/modal/ubah-kategori'
import { makeJwtPutRequestAction } from '@/utils/action'

export const ubahKategoriMateriAction = async (
  id: string,
  data: UbahKategoriFormSchema
) =>
  makeJwtPutRequestAction(
    `${process.env.NEXT_PUBLIC_API_URL}/kategori-bank-ajar/${id}`,
    {
      nama_kategori: data.nama,
    }
  )
