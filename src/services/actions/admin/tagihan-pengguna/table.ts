'use server'

import { ControlledAsyncTableActionProps } from '@/components/ui/controlled-async-table'
import { DataType } from '@/services/api/admin/tagihan-pengguna/table'
import { makeJwtGetRequestTableAction } from '@/utils/action'

export const tableTagihanPenggunaAction = async ({
  page = 1,
  search = '',
  sort,
}: ControlledAsyncTableActionProps) =>
  makeJwtGetRequestTableAction<DataType>(
    `${process.env.API_URL}/admin/tagihan-pengguna`,
    {
      current_page: page,
      keyword: search,
      sort_by: sort?.name,
      order: sort?.order,
    }
  )
