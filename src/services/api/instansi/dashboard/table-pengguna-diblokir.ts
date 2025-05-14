import { ControlledAsyncTableApiProps } from '@/components/ui/controlled-async-table'
import { makeJwtGetRequestTableApi } from '@/utils/api'

type DataType = {
  id: string
  nama: string
  jenis_akun: string
  tanggal_blokir: string
  keterangan_blokir: string
}

export const tablePenggunaDiblokirApi = async ({
  jwt,
  page = 1,
  search = '',
  sort,
}: ControlledAsyncTableApiProps) =>
  makeJwtGetRequestTableApi<DataType>(
    `${process.env.NEXT_PUBLIC_API_URL}/instansi/pengguna-blokir`,
    jwt,
    {
      current_page: page,
      keyword: search,
      sort_by: sort?.name,
      order: sort?.order,
    }
  )
