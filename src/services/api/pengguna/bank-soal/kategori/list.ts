import { ControlledAsyncTableApiProps } from '@/components/ui/controlled-async-table'
import { makeJwtGetRequestTableApi } from '@/utils/api'

export type DataType = {
  id: string
  nama_kategori: string
  id_pengajar: string
  total_bank_soal: number
}

export const listKategoriBankSoalApi = async ({
  jwt,
  page = 1,
  search = '',
}: ControlledAsyncTableApiProps) =>
  makeJwtGetRequestTableApi<DataType>(
    `${process.env.NEXT_PUBLIC_API_URL}/kategori-bank-soal`,
    jwt,
    {
      current_page: page,
      keyword: search,
      per_page: 20,
    }
  )
