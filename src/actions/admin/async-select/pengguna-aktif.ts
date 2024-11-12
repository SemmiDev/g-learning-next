'use server'

import { AsyncPaginateSelectActionProps } from '@/components/ui/select/async-paginate'
import { makeJwtGetRequestSelectDataAction } from '@/utils/action'

export type DataType = {
  id: string
  nama: string
}

export const penggunaAktifSelectDataAction = async ({
  page,
  search,
}: AsyncPaginateSelectActionProps) =>
  makeJwtGetRequestSelectDataAction<DataType>(
    `${process.env.API_URL}/admin/pengguna-aktif`,
    {
      current_page: page,
      keyword: search,
    }
  )
