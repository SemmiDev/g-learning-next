import { SortType } from '@/hooks/use-table-async'
import { makeJwtGetRequestTableAction } from '@/utils/action'

export type DataType = {
  id_aktifitas: string
  id_jawaban: string | null
  jenis_ujian: string
  jadwal_mulai: string
  jadwal_selesai: string
  waktu_mulai: string | null
  waktu_selesai: string | null
  judul: string
  status: string
  deskripsi: string
}

export const listUjianAction = async ({
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
    `${process.env.NEXT_PUBLIC_API_URL}/peserta/kelas/${idKelas}/daftar-ujian`,
    {
      current_page: page,
      keyword: search,
      sort_by: sort?.name,
      order: sort?.order,
      per_page: 20,
    }
  )
