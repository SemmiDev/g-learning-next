import { ControlledAsyncTableApiProps } from '@/components/ui/controlled-async-table'
import { makeJwtGetRequestTableApi } from '@/utils/api'

type DataType = {
  id: string
  nama: string
  jenis_akun: string
  jumlah_kelas: number
  batas_kelas: number
  jumlah_penyimpanan: number
  batas_penyimpanan: number
}

export const tablePenggunaApi = async ({
  jwt,
  page = 1,
  search = '',
  sort,
}: ControlledAsyncTableApiProps) =>
  makeJwtGetRequestTableApi<DataType>(
    `${process.env.NEXT_PUBLIC_API_URL}/prodi/pengguna`,
    jwt,
    {
      current_page: page,
      keyword: search,
      sort_by: sort?.name,
      order: sort?.order,
    }
  )
