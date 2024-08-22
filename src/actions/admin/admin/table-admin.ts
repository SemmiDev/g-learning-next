'use server'

import {
  ControlledAsyncTableActionProps,
  ControlledAsyncTableActionType,
} from '@/components/ui/controlled-async-table'
import { makeJwtGetRequestAction } from '@/utils/action'
import { AnyObject } from '@/utils/type-interface'
import _ from 'lodash'

export type DataType = {
  id: string
  nama: string
  username: string
  terakhir_login: string
}

type ResDataType = {
  list: DataType[]
  page_info: {
    current_page: number
    per_page: number
    total_data: number
    last_page: number
    from: number
    to: number
  }
}

export const tableAdminAction = async ({
  page = 1,
  search = '',
  sort,
  filters,
}: ControlledAsyncTableActionProps): Promise<ControlledAsyncTableActionType> => {
  const { data } = await makeJwtGetRequestAction<ResDataType>(
    `${process.env.API_URL}/admin/akun`,
    {
      current_page: page,
      keyword: search,
      sort_by: sort?.name,
      order: sort?.direction,
    }
  )

  return {
    data:
      data?.list?.map((item) =>
        _.pick(item, ['id', 'nama', 'username', 'terakhir_login'])
      ) ?? [],
    perPage: data?.page_info?.per_page,
    totalData: data?.page_info?.per_page,
  }
}
