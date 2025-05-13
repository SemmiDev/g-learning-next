import { ControlledAsyncTableApiProps } from '@/components/ui/controlled-async-table'
import { makeJwtGetRequestTableApi } from '@/utils/api'

export type DataType = {
  id: string
  nama: string
  paket: string
  jatuh_tempo: string
}

export const tableJatuhTempoApi = async ({
  jwt = '',
  page = 1,
  search = '',
  sort,
}: ControlledAsyncTableApiProps = {}) =>
  makeJwtGetRequestTableApi<DataType>(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/dashboard/jatuh-tempo-pembayaran`,
    jwt,
    {
      current_page: page,
      keyword: search,
      sort_by: sort?.name,
      order: sort?.order,
    }
  )
