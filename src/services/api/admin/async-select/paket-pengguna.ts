import { AsyncPaginateSelectActionProps } from '@/components/ui/select/async-paginate'
import { makeJwtGetRequestSelectDataApi } from '@/utils/api'

export type DataType = {
  id: string
  nama: string
  harga: number
  tipe: string
}

export const paketPenggunaSelectDataApi = async ({
  jwt,
  page,
  search,
}: AsyncPaginateSelectActionProps) =>
  makeJwtGetRequestSelectDataApi<DataType>(
    `${process.env.NEXT_PUBLIC_API_URL}/paket-pengguna`,
    jwt,
    {
      current_page: page,
      keyword: search,
      tipe: 'Custom',
    }
  )
