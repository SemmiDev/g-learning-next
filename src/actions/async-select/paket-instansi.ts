'use server'

import { AsyncPaginateSelectActionProps } from '@/components/ui/select/async-paginate'
import { makeJwtGetRequestSelectDataAction } from '@/utils/action'

export type DataType = {
  id: string
  nama: string
  tipe: string
}

export const paketInstansiSelectDataAction = async <OptionType>({
  page,
  search,
}: AsyncPaginateSelectActionProps<OptionType>) =>
  makeJwtGetRequestSelectDataAction<DataType>(
    `${process.env.API_URL}/admin/paket-instansi`,
    {
      current_page: page,
      keyword: search,
    }
  )
