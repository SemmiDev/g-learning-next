'use server'

import { makeJwtDeleteRequestAction } from '@/utils/action'

export const hapusBankMateriAction = (idKategori: string, id: string) =>
  makeJwtDeleteRequestAction(
    `${process.env.API_URL}/kategori-bank-ajar/${idKategori}/bank-ajar/${id}`
  )
