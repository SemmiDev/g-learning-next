'use server'

import { ControlledAsyncTableApiProps } from '@/components/ui/controlled-async-table'
import { makeJwtGetRequestTableApi } from '@/utils/api'

export type DataType = {
  id: string
  nama: string
  batas_penyimpanan: number
  batas_kelas: number
  batas_anggota_kelas: number
  tipe: 'Default' | 'Custom'
  harga: number
  created_at: string
  updated_at: string
}

export const listPaketPenggunaApi = async ({
  jwt = '',
  page = 1,
  search = '',
  sort,
}: ControlledAsyncTableApiProps = {}) =>
  makeJwtGetRequestTableApi<DataType>(
    `${process.env.NEXT_PUBLIC_API_URL}/paket-pengguna`,
    jwt,
    {
      current_page: page,
      keyword: search,
      sort_by: sort?.name,
      order: sort?.order,
    }
  )
