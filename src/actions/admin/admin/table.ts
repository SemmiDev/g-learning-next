'use server'

import {
  ControlledAsyncTableActionProps,
  ControlledAsyncTableActionType,
} from '@/components/ui/controlled-async-table'
import { makeJwtGetRequestTableAction } from '@/utils/action'

export type DataType = {
  id: string
  nama: string
  username: string
  terakhir_login: string
}

export const tableAdminAction = async ({
  page = 1,
  search = '',
  sort,
}: ControlledAsyncTableActionProps = {}): Promise<
  ControlledAsyncTableActionType<DataType>
> =>
  makeJwtGetRequestTableAction(`${process.env.API_URL}/admin/akun`, {
    current_page: page,
    keyword: search,
    sort_by: sort?.name,
    order: sort?.direction,
  })
