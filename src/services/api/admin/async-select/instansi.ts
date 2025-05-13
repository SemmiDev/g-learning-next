import { AsyncPaginateSelectActionProps } from '@/components/ui/select/async-paginate'
import { makeJwtGetRequestSelectDataApi } from '@/utils/api'

export type DataType = {
  id: string
  nama: string
  jenis: string
}

export const instansiSelectDataApi = async ({
  jwt,
  page,
  search,
}: AsyncPaginateSelectActionProps) =>
  makeJwtGetRequestSelectDataApi<DataType>(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/instansi`,
    jwt,
    {
      current_page: page,
      keyword: search,
    }
  )
