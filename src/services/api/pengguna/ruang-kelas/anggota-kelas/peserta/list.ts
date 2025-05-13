import { SortType } from '@/hooks/use-table-async'
import { makeJwtGetRequestTableAction } from '@/utils/action'

export type DataType = {
  id: string
  nama: string
  username: string
  email: string
  foto: string
  peran: 'Pengajar' | 'Peserta'
}

export const listAnggotaKelasAction = async ({
  page = 1,
  search = '',
  sort,
  idKelas,
}: {
  page?: number
  search?: string
  sort?: SortType
  idKelas: string
}) =>
  makeJwtGetRequestTableAction<DataType>(
    `${process.env.NEXT_PUBLIC_API_URL}/peserta/kelas/${idKelas}/peserta-kelas`,
    {
      current_page: page,
      keyword: search,
      sort_by: sort?.name,
      order: sort?.order,
      per_page: 20,
    }
  )
