import { makeJwtDeleteRequestAction } from '@/utils/action'

export const hapusKategoriBankSoalAction = async (id: string) =>
  makeJwtDeleteRequestAction(
    `${process.env.NEXT_PUBLIC_API_URL}/kategori-bank-soal/${id}`
  )
