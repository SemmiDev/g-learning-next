'use server'

import { SortType } from '@/hooks/use-table-async'
import { makeJwtGetRequestTableAction } from '@/utils/action'

export type DataType = {
  id: string
  id_parent: string
  nama: string
  deskripsi: string
  content: string
  ekstensi: string
  tipe: string
  url: string
  ukuran: number
  id_pengguna: string
  id_instansi: string
  created_at: string
  updated_at: string
  total_files: number
}

export const listFileAction = async ({
  page = 1,
  search = '',
  personal,
  idInstansi,
  idFolder,
  sort,
}: {
  page?: number
  search?: string
  personal?: boolean
  idInstansi?: string
  idFolder?: string
  sort?: SortType
}) =>
  makeJwtGetRequestTableAction<DataType>(
    `${process.env.API_URL}/pustaka-media`,
    {
      current_page: page,
      keyword: search,
      sort_by: sort?.name,
      order: sort?.direction,
      per_page: 100,
      personal: personal ? 'true' : undefined,
      id_instansi: idInstansi,
      id_parent: idFolder,
    }
  )
