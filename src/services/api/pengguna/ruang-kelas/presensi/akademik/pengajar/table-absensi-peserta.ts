import { ControlledAsyncTableActionProps } from '@/components/ui/controlled-async-table'
import { makeJwtGetRequestTableAction } from '@/utils/action'

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

export const tableAbsensiPesertaAction = async ({
  page = 1,
  search = '',
  sort,
  perPage,
  params,
}: ControlledAsyncTableActionProps) =>
  makeJwtGetRequestTableAction<DataType>(
    `${process.env.NEXT_PUBLIC_API_URL}/kelas-akademik/${params?.idKelas}/pertemuan/${params?.idSesi}/absensi-peserta`,
    {
      current_page: page,
      keyword: search,
      sort_by: sort?.name,
      order: sort?.order,
      per_page: perPage,
    }
  )
