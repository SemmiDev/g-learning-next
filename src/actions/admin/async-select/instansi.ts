'use server'

import { AsyncPaginateSelectActionProps } from '@/components/ui/select/async-paginate'
import { makeJwtGetRequestSelectDataAction } from '@/utils/action'

export type DataType = {
  id: string
  nama: string
  jenis: string
}

export const instansiSelectDataAction = async ({
  page,
  search,
}: AsyncPaginateSelectActionProps) =>
  makeJwtGetRequestSelectDataAction<DataType>(
    `${process.env.API_URL}/admin/instansi`,
    {
      current_page: page,
      keyword: search,
    }
  )
