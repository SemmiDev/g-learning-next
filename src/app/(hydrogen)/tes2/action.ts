'use server'

import { AsyncPaginateSelectActionProps } from '@/components/ui/select/async-paginate'
import { wait } from '@/utils/wait'

export const tesAsyncAction = async ({
  search,
  loadedOptions,
  page,
}: AsyncPaginateSelectActionProps) => {
  await wait(1000)

  let data = []
  for (let i = 0; i < 10; i++) {
    const rndm = (Math.random() + 1).toString(36).substring(7)

    data.push({ nama: rndm, id: rndm })
  }

  return data
}
