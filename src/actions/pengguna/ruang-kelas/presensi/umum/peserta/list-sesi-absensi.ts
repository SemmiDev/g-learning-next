'use server'

import { SortType } from '@/hooks/use-table-async'
import { makeJwtGetRequestTableAction } from '@/utils/action'

export type DataType = {
  id_aktifitas: string
  id_absensi: string | null
  tipe_absensi: string | null
  judul_aktifitas: string
  waktu_akhir_absen: string | null
  status: string
  waktu_absen: string | null
}

export const listSesiAbsensiAction = async ({
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
    `${process.env.API_URL}/peserta/kelas/${idKelas}/absensi/sesi-kehadiran`,
    {
      current_page: page,
      keyword: search,
      sort_by: sort?.name,
      order: sort?.order,
      per_page: 20,
    }
  )
