'use server'

import { DataType } from '@/services/api/pengguna/ruang-kelas/lihat'
import { makeJwtGetRequestAction } from '@/utils/action'

export const lihatKelasAction = async (id: string) =>
  makeJwtGetRequestAction<DataType>(`${process.env.API_URL}/kelas/${id}`)
