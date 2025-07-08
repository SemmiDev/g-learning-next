import { ControlledAsyncTableApiProps } from '@/components/ui/controlled-async-table'
import { makeJwtGetRequestTableApi } from '@/utils/api'

export type DataType = {
  id_kelas: string
  id_aktifitas: string
  id_peserta: string
  status: string
  username: string
  email: string
  nama: string
  foto: string
}

export const tableAbsensiPesertaApi = async ({
  jwt,
  page = 1,
  search = '',
  sort,
  perPage,
  params,
}: ControlledAsyncTableApiProps) =>
  makeJwtGetRequestTableApi<DataType>(
    `${process.env.NEXT_PUBLIC_API_URL}/instansi/kelas/${params?.idKelas}/pertemuan/${params?.idSesi}/absensi-peserta`,
    jwt,
    {
      current_page: page,
      keyword: search,
      sort_by: sort?.name,
      order: sort?.order,
      per_page: perPage,
    }
  )
