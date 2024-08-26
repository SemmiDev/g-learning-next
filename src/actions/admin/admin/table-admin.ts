'use server'

import {
  ControlledAsyncTableActionProps,
  ControlledAsyncTableActionType,
} from '@/components/ui/controlled-async-table'
import {
  ActionResponseTableDataType,
  makeJwtGetRequestAction,
  makeTableActionResponse,
} from '@/utils/action'

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
}: ControlledAsyncTableActionProps = {}): Promise<ControlledAsyncTableActionType> => {
  const resData = await makeJwtGetRequestAction<
    ActionResponseTableDataType<DataType>
  >(`${process.env.API_URL}/admin/akun`, {
    current_page: page,
    keyword: search,
    sort_by: sort?.name,
    order: sort?.direction,
  })

  return makeTableActionResponse<DataType>(resData)
}
