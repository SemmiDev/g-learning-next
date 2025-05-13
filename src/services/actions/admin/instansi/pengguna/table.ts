'use server'

import { ControlledAsyncTableActionProps } from '@/components/ui/controlled-async-table'
import { DataType } from '@/services/api/admin/instansi/pengguna/table'
import { makeJwtGetRequestTableAction } from '@/utils/action'

export const tablePenggunaInstansiAction = async ({
  page = 1,
  search = '',
  sort,
  params,
}: ControlledAsyncTableActionProps = {}) =>
  makeJwtGetRequestTableAction<DataType>(
    `${process.env.API_URL}/admin/instansi/${params?.id}/anggota`,
    {
      current_page: page,
      keyword: search,
      sort_by: sort?.name,
      order: sort?.order,
    }
  )
