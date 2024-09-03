'use server'

import {
  ControlledAsyncTableActionProps,
  ControlledAsyncTableActionType,
} from '@/components/ui/controlled-async-table'

export type DataType = {
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

  return {
    success: true,
    data: {
      list: data,
      pagination: {
        page: 1,
        lastPage: 1,
        perPage: 5,
        totalData: 10,
        from: 1,
        to: 1,
      },
    },
  }
}
