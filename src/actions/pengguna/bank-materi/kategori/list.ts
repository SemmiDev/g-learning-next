'use server'

import { ControlledAsyncTableActionProps } from '@/components/ui/controlled-async-table'
import { makeJwtGetRequestTableAction } from '@/utils/action'

export type DataType = {
  id: string
  nama_kategori: string
  id_pengguna: string
  total_materi: number
}

export const listKategoriBankMateriAction = async ({
  page = 1,
  search = '',
}: ControlledAsyncTableActionProps = {}) =>
  makeJwtGetRequestTableAction<DataType>(
    `${process.env.API_URL}/kategori-bank-ajar`,
    {
      current_page: page,
      keyword: search,
      sort_by: 'nama_kategori',
      order: 'asc',
      per_page: 20,
    }
  )
