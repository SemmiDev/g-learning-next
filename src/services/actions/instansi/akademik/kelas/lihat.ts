'use server'

import { DataType } from '@/services/api/instansi/akademik/kelas/lihat'
import { makeJwtGetRequestAction } from '@/utils/action'

export const lihatKelasAction = async (id: string) =>
  makeJwtGetRequestAction<DataType>(
    `${process.env.API_URL}/instansi/kelas/${id}`
  )
