'use server'

import { makeJwtDeleteRequestAction } from '@/utils/action'

export const hapusKategoriBankMateriAction = async (id: string) =>
  makeJwtDeleteRequestAction(`${process.env.API_URL}/kategori-bank-ajar/${id}`)
