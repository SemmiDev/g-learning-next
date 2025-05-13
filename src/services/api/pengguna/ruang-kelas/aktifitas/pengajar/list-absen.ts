import { makeJwtGetRequestTableAction } from '@/utils/action'

export type DataType = {
  id_kelas: string
  id_aktifitas: string
  id_peserta: string
  status: 'Hadir' | 'Izin' | 'Sakit' | 'Alpha' | ''
  username: string
  email: string
  nama: string
  foto: string
}

export const listAbsensiAktifitasAction = async ({
  page = 1,
  idKelas,
  id,
}: {
  page?: number
  idKelas: string
  id: string
}) =>
  makeJwtGetRequestTableAction<DataType>(
    `${process.env.NEXT_PUBLIC_API_URL}/pengajar/kelas/${idKelas}/aktifitas/${id}/absensi`,
    {
      current_page: page,
      per_page: 100,
    }
  )
