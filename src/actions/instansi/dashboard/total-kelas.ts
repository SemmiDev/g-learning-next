'use server'

import { makeJwtGetRequestAction } from '@/utils/action'

export type DataType = {
  total: number
  digunakan: number
  tersedia: number
}

export const totalKelasAction = async () =>
  makeJwtGetRequestAction<DataType>(
    `${process.env.API_URL}/instansi/total-kelas`
  )
