'use server'

import { makeJwtDeleteRequestAction } from '@/utils/action'

export const hapusKelasAction = async (id: string) =>
  makeJwtDeleteRequestAction(`${process.env.API_URL}/kelas/${id}`)
