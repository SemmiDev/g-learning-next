'use server'

import {
  ControlledAsyncTableActionProps,
  ControlledAsyncTableActionType,
} from '@/components/ui/controlled-async-table'
import { wait } from '@/utils/wait'

type DataType = {
  id: string
  nama: string
  email: string
}

export const tesAsyncAction = async ({
  page = 1,
  search = '',
  sort,
  filters,
}: ControlledAsyncTableActionProps): Promise<
  ControlledAsyncTableActionType<DataType>
> => {
  // await wait(3000)

  const data = [...Array(5)].map((v, idx) => {
    const no = idx + 1 + ''

    return {
      id: no,
      nama: `Nama ${no}`,
      email: `email${no}@namaweb.com`,
    }
  })

  return { data: data, totalData: 50 }
}
