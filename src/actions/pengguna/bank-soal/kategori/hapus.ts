'use server'

import { makeJwtDeleteRequestAction } from '@/utils/action'

export const hapusKategoriBankSoalAction = async (id: string) =>
  makeJwtDeleteRequestAction(`${process.env.API_URL}/kategori-bank-soal/${id}`)
