import { ControlledAsyncTableApiProps } from '@/components/ui/controlled-async-table'
import { makeJwtGetRequestTableApi } from '@/utils/api'

export type DataType = {
  id: string
  nama: string
  instansi: string
  jenis_akun: string
  jumlah_penyimpanan_terpakai: number
  batas_penyimpanan: number
  jumlah_kelas_terpakai: number
  batas_kelas: number
}

export const tablePenggunaInstansiApi = async ({
  jwt = '',
  page = 1,
  search = '',
  sort,
  params,
}: ControlledAsyncTableApiProps = {}) =>
  makeJwtGetRequestTableApi<DataType>(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/instansi/${params?.id}/anggota`,
    jwt,
    {
      current_page: page,
      keyword: search,
      sort_by: sort?.name,
      order: sort?.order,
    }
  )
