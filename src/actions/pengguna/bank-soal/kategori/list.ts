'use server'

import { ControlledAsyncTableActionProps } from '@/components/ui/controlled-async-table'
import { makeJwtGetRequestTableAction } from '@/utils/action'

export type DataType = {
  id: string
  nama_kategori: string
  id_pengajar: string
  total_bank_soal: number
}

export const listKategoriBankSoalAction = async ({
  page = 1,
  search = '',
}: ControlledAsyncTableActionProps = {}) =>
  makeJwtGetRequestTableAction<DataType>(
    `${process.env.API_URL}/kategori-bank-soal`,
    {
      current_page: page,
      keyword: search,
      per_page: 20,
    }
  )
