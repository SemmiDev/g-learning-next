import { makeJwtPutRequestAction } from '@/utils/action'

export const ubahKategoriBankSoalAction = async (id: string, data: any) =>
  makeJwtPutRequestAction(
    `${process.env.NEXT_PUBLIC_API_URL}/kategori-bank-soal/${id}`,
    {
      nama_kategori: data.nama,
    }
  )
