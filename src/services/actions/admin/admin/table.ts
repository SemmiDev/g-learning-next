'use server'

import { ControlledAsyncTableActionProps } from '@/components/ui/controlled-async-table'
import { DataType } from '@/services/api/admin/admin/table'
import { makeJwtGetRequestTableAction } from '@/utils/action'

export const tableAdminAction = async ({
  page = 1,
  search = '',
  sort,
}: ControlledAsyncTableActionProps) =>
  makeJwtGetRequestTableAction<DataType>(`${process.env.API_URL}/admin/akun`, {
    current_page: page,
    keyword: search,
    sort_by: sort?.name,
    order: sort?.order,
  })
