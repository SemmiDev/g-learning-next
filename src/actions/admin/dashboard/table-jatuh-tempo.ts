'use server'

import { ControlledAsyncTableActionProps } from '@/components/ui/controlled-async-table'
import { makeJwtGetRequestTableAction } from '@/utils/action'

export type DataType = {
  id: string
  nama: string
  paket: string
  jatuh_tempo: string
}

export const tableJatuhTempoAction = async ({
  page = 1,
  search = '',
  sort,
}: ControlledAsyncTableActionProps = {}) =>
  makeJwtGetRequestTableAction<DataType>(
    `${process.env.API_URL}/admin/dashboard/jatuh-tempo-pembayaran`,
    {
      current_page: page,
      keyword: search,
      sort_by: sort?.name,
      order: sort?.direction,
    }
  )
