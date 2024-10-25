'use server'

import { SortType } from '@/hooks/use-table-async'
import { makeJwtGetRequestTableAction } from '@/utils/action'

export type DataType = {
  id: string
  judul: string
  status: string
  deskripsi: string | null
  batas_waktu: string | null
}

export const listUjianAction = async ({
  page = 1,
  search = '',
  sort,
  idKelas,
}: {
  page?: number
  search?: string
  sort?: SortType
  idKelas: string
}) =>
  makeJwtGetRequestTableAction<DataType>(
    `${process.env.API_URL}/peserta/kelas/${idKelas}/daftar-ujian`,
    {
      current_page: page,
      keyword: search,
      sort_by: sort?.name,
      order: sort?.order,
      per_page: 20,
    }
  )
