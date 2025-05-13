import { makeJwtDeleteRequestAction } from '@/utils/action'

export const hapusBankSoalAction = async (idKategori: string, id: string) =>
  makeJwtDeleteRequestAction(
    `${process.env.NEXT_PUBLIC_API_URL}/kategori-bank-soal/${idKategori}/bank-soal/${id}`
  )
