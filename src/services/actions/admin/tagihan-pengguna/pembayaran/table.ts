'use server'

import { ControlledAsyncTableActionProps } from '@/components/ui/controlled-async-table'
import { DataType } from '@/services/api/admin/tagihan-pengguna/pembayaran/table'
import { makeJwtGetRequestTableAction } from '@/utils/action'

export const tablePembayaranTagihanPenggunaAction = async ({
  page = 1,
  search = '',
  sort,
  params,
}: ControlledAsyncTableActionProps) =>
  makeJwtGetRequestTableAction<DataType>(
    `${process.env.API_URL}/admin/tagihan-pengguna/${params?.idTagihan}/pembayaran`,
    {
      current_page: page,
      keyword: search,
      sort_by: sort?.name,
      order: sort?.order,
    }
  )
