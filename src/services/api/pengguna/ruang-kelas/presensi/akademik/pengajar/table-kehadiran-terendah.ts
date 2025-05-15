import { ControlledAsyncTableApiProps } from '@/components/ui/controlled-async-table'
import { makeJwtGetRequestTableApi } from '@/utils/api'

export type DataType = {
  id_pengguna: string
  foto_pengguna: string
  nama_pengguna: string
  email_pengguna: string
  total_hadir: number
  total_izin: number
  total_sakit: number
  total_alpha: number
}

export const tableKehadiranTerendahApi = async ({
  jwt,
  page = 1,
  search = '',
  sort,
  params,
}: ControlledAsyncTableApiProps) =>
  makeJwtGetRequestTableApi<DataType>(
    `${process.env.NEXT_PUBLIC_API_URL}/pengajar/kelas-akademik/${params?.idKelas}/absensi/kehadiran-terendah`,
    jwt,
    {
      current_page: page,
      keyword: search,
      sort_by: sort?.name,
      order: sort?.order,
      per_page: 5,
    }
  )
