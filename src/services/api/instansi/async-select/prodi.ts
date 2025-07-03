import { AsyncPaginateSelectActionProps } from '@/components/ui/select/async-paginate'
import { makeJwtGetRequestSelectDataApi } from '@/utils/api'

export type DataType = {
  id: string
  id_sms: string
  nm_lemb: string
  nama_jenjang_didik: string
}

export const prodiSelectDataApi = async ({
  jwt,
  page,
  search,
}: AsyncPaginateSelectActionProps) =>
  makeJwtGetRequestSelectDataApi<DataType>(
    `${process.env.NEXT_PUBLIC_API_URL}/instansi/sms`,
    jwt,
    {
      current_page: page,
      keyword: search,
    }
  )
