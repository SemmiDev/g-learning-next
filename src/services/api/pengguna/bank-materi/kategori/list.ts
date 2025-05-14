import { ControlledAsyncTableApiProps } from '@/components/ui/controlled-async-table'
import { makeJwtGetRequestTableApi } from '@/utils/api'

export type DataType = {
  id: string
  nama_kategori: string
  id_pengguna: string
  total_materi: number
}

export const listKategoriBankMateriApi = async ({
  jwt,
  page = 1,
  search = '',
}: ControlledAsyncTableApiProps) =>
  makeJwtGetRequestTableApi<DataType>(
    `${process.env.NEXT_PUBLIC_API_URL}/kategori-bank-ajar`,
    jwt,
    {
      current_page: page,
      keyword: search,
      sort_by: 'nama_kategori',
      order: 'asc',
      per_page: 20,
    }
  )
