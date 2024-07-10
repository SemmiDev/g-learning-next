'use server'

import {
  AsyncPaginateSelectActionProps,
  AsyncPaginateSelectActionType,
} from '@/components/ui/select/async-paginate'
import { wait } from '@/utils/wait'

export const tesAsyncAction = async <OptionType>({
  search,
  loadedOptions,
  page,
}: AsyncPaginateSelectActionProps<OptionType>): Promise<AsyncPaginateSelectActionType> => {
  await wait(1000)

  let data = []
  for (let i = 0; i < 10; i++) {
    const rndm = (Math.random() + 1).toString(36).substring(7)

    data.push({ nama: `${page}${rndm.toUpperCase()}`, id: rndm })
  }

  return { data: data, hasMore: page < 5 }
}
