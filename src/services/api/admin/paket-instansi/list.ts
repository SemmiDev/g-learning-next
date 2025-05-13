import { ControlledAsyncTableApiProps } from '@/components/ui/controlled-async-table'
import { makeJwtGetRequestTableApi } from '@/utils/api'

export type DataType = {
  id: string
  nama: string
  batas_penyimpanan: number
  batas_pengguna: number
  batas_penyimpanan_pengajar: number
  batas_penyimpanan_peserta: number
  batas_kelas: number
  batas_kelas_pengajar: number
  harga: number
  tipe: 'Default' | 'Custom'
  created_at: string
  updated_at: string
}

export const listPaketInstansiApi = async ({
  jwt = '',
  page = 1,
  search = '',
  sort,
}: ControlledAsyncTableApiProps = {}) =>
  makeJwtGetRequestTableApi<DataType>(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/paket-instansi`,
    jwt,
    {
      current_page: page,
      keyword: search,
      sort_by: sort?.name,
      order: sort?.order,
    }
  )
