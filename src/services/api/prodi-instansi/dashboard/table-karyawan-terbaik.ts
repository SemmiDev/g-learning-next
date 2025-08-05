import { ControlledAsyncTableApiProps } from '@/components/ui/controlled-async-table'
import { makeJwtGetRequestTableApi } from '@/utils/api'

type DataType = {
  id_pengguna: string
  nama: string
  total_poin: number
}

export const tableKaryawanTerbaikApi = async (jwt: string) =>
  makeJwtGetRequestTableApi<DataType>(
    `${process.env.NEXT_PUBLIC_API_URL}/prodi/poin-pengguna`,
    jwt,
    {
      current_page: 1,
      sort_by: 'total_poin',
      order: 'DESC',
      per_page: 7,
    }
  )
