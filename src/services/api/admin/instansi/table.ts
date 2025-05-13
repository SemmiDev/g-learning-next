import { ControlledAsyncTableApiProps } from '@/components/ui/controlled-async-table'
import { makeJwtGetRequestTableApi } from '@/utils/api'

export type DataType = {
  id: string
  nama: string
  nama_pimpinan: string
  telepon_pimpinan: string
  telepon_instansi: string
  jenis: string
  id_paket: string
  nama_paket: string
  semester_aktif: string
  jatuh_tempo: string
  jumlah_pengguna: number
  jumlah_penyimpanan_terpakai: number
  jumlah_kelas: number
  batas_penyimpanan: number
  batas_pengguna: number
  batas_kelas: number
  tipe: string
}

export const tableInstansiApi = async ({
  jwt = '',
  page = 1,
  search = '',
  sort,
}: ControlledAsyncTableApiProps = {}) =>
  makeJwtGetRequestTableApi<DataType>(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/instansi`,
    jwt,
    {
      current_page: page,
      keyword: search,
      sort_by: sort?.name,
      order: sort?.order,
    }
  )
