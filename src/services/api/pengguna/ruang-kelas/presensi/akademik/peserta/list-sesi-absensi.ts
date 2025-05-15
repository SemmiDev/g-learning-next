import { SortType } from '@/hooks/use-table-async'
import { makeJwtGetRequestTableApi } from '@/utils/api'

export type DataType = {
  id_pertemuan: string
  id_kelas: string
  judul: string
  pertemuan: number
  hari:
    | 'Senin'
    | 'Selasa'
    | 'Rabu'
    | 'Kamis'
    | 'Jumat'
    | 'Sabtu'
    | 'Minggu'
    | null
  waktu_mulai: string
  waktu_sampai: string
  status_pertemuan: 'Telah Berakhir'
  tanggal_realisasi: string | null
  id_absensi_pertemuan: string | null
  id_peserta: string
  status_absensi: 'Hadir' | 'Izin' | 'Sakit' | 'Alpha' | null
  waktu_absensi: string | null
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
    `${process.env.NEXT_PUBLIC_API_URL}/peserta/kelas-akademik/${idKelas}/absensi/sesi-kehadiran`,
    jwt,
    {
      current_page: page,
      keyword: search,
      sort_by: sort?.name,
      order: sort?.order,
      status: 'Sedang Berlangsung|Telah Berakhir',
    }
  )
