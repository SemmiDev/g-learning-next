'use server'

import {
  AsyncPaginateSelectActionProps,
  AsyncPaginateSelectActionType,
} from '@/components/ui/select/async-paginate'
import { makeJwtGetRequestAction } from '@/utils/action'

type DataType = {}

export const paketInstansiSelectDataAction = async <OptionType>({
  page,
  search,
}: AsyncPaginateSelectActionProps<OptionType>): Promise<AsyncPaginateSelectActionType> => {
  const { data } = await makeJwtGetRequestAction(
    `${process.env.API_URL}/admin/paket-instansi`,
    {
      current_page: page,
      keyword: search,
    }
  )

  return { data: data?.list ?? [], hasMore: !!data?.page_info?.has_next_page }
}
