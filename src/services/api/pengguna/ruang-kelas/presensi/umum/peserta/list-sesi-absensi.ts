import { SortType } from '@/hooks/use-table-async'
import { makeJwtGetRequestTableApi } from '@/utils/api'

export type DataType = {
  id_aktifitas: string
  id_absensi: string | null
  tipe_absensi: string | null
  judul_aktifitas: string
  waktu_akhir_absen: string | null
  status: string
  waktu_absen: string | null
}

export const listSesiAbsensiApi = async ({
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
    `${process.env.NEXT_PUBLIC_API_URL}/peserta/kelas/${idKelas}/absensi/sesi-kehadiran`,
    jwt,
    {
      current_page: page,
      keyword: search,
      sort_by: sort?.name,
      order: sort?.order,
      per_page: 20,
    }
  )
