import { makeJwtDeleteRequestAction } from '@/utils/action'

export const hapusMateriAction = async (idKategori: string, id: string) =>
  makeJwtDeleteRequestAction(
    `${process.env.NEXT_PUBLIC_API_URL}/kategori-bank-ajar/${idKategori}/bank-ajar/${id}`
  )
