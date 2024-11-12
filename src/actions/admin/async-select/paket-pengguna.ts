'use server'

import { AsyncPaginateSelectActionProps } from '@/components/ui/select/async-paginate'
import { makeJwtGetRequestSelectDataAction } from '@/utils/action'

export type DataType = {
  id: string
  nama: string
  harga: number
  tipe: string
}

export const paketPenggunaSelectDataAction = async ({
  page,
  search,
}: AsyncPaginateSelectActionProps) =>
  makeJwtGetRequestSelectDataAction<DataType>(
    `${process.env.API_URL}/paket-pengguna`,
    {
      current_page: page,
      keyword: search,
    }
  )
