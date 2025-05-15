import { SortType } from '@/hooks/use-table-async'
import { makeJwtGetRequestTableApi } from '@/utils/api'

export type DataType = {
  id: string
  judul: string
  status: string
  deskripsi: string | null
  batas_waktu: string | null
  id_pertemuan_kelas: string | null
}

export const listTugasApi = async ({
  jwt,
  page = 1,
  search = '',
  sort,
  idKelas,
}: {
  jwt: string
  page?: number
  search?: string
  sort?: SortType
  idKelas: string
}) =>
  makeJwtGetRequestTableApi<DataType>(
    `${process.env.NEXT_PUBLIC_API_URL}/peserta/kelas/${idKelas}/daftar-tugas`,
    jwt,
    {
      current_page: page,
      keyword: search,
      sort_by: sort?.name,
      order: sort?.order,
      per_page: 20,
    }
  )
