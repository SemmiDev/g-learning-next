import { makeJwtDeleteRequestAction } from '@/utils/action'

export const hapusKategoriMateriAction = async (id: string) =>
  makeJwtDeleteRequestAction(
    `${process.env.NEXT_PUBLIC_API_URL}/kategori-bank-ajar/${id}`
  )
