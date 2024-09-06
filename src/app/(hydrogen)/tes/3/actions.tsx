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
  perPage,
}: ControlledAsyncTableActionProps): Promise<
  ControlledAsyncTableActionType<DataType>
> => {
  // await wait(3000)

  const realPerPage = perPage ?? 5

  const totalData = 100
  const lastPage = Math.floor(totalData / realPerPage)
  const startFrom = (page - 1) * realPerPage

  const data = [...Array(realPerPage)].map((v, idx) => {
    const no = startFrom + idx + 1 + ''

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
        page: page,
        lastPage: lastPage,
        perPage: realPerPage,
        totalData: totalData,
      },
    },
  }
}
