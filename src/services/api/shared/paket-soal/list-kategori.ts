import { ControlledAsyncTableApiProps } from '@/components/ui/controlled-async-table'
import { makeActionResponse, makeTableActionResponse } from '@/utils/action'
import { makeJwtGetRequestTableApi } from '@/utils/api'

export type DataType = {
  id: string
  nama_kategori: string
  id_pengajar: string
  total_bank_soal: number
}

export const listKategoriSoalApi = async ({
  jwt,
  page = 1,
  search = '',
}: ControlledAsyncTableApiProps) => {
  if (!jwt) return makeTableActionResponse<DataType>(makeActionResponse(false))

  return await makeJwtGetRequestTableApi<DataType>(
    `${process.env.NEXT_PUBLIC_API_URL}/kategori-bank-soal`,
    jwt,
    {
      current_page: page,
      keyword: search,
      per_page: 20,
    }
  )
}
