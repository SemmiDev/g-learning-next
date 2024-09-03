'use server'

import {
  AsyncPaginateSelectActionProps,
  AsyncPaginateSelectActionType,
} from '@/components/ui/select/async-paginate'
import { wait } from '@/utils/wait'

type DataType = {
  id: string
  nama: string
}

export const tesAsyncAction = async ({
  page,
  search,
  loadedOptions,
}: AsyncPaginateSelectActionProps): Promise<
  AsyncPaginateSelectActionType<DataType>
> => {
  await wait(500)

  let data = []
  for (let i = 0; i < 10; i++) {
    const rndm = (Math.random() + 1).toString(36).substring(7)

    data.push({ nama: `${page}${rndm.toUpperCase()}`, id: rndm })
  }

  return { list: data, hasMore: page < 5 }
}
