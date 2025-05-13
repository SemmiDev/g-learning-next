import { makeJwtPostRequestAction } from '@/utils/action'

export const duplikatBankSoalAction = async (idKategori: string, id: string) =>
  makeJwtPostRequestAction(
    `${process.env.NEXT_PUBLIC_API_URL}/kategori-bank-soal/${idKategori}/bank-soal/${id}/duplikasi`
  )
