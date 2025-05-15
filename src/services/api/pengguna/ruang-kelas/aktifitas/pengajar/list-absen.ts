import { makeJwtGetRequestTableApi } from '@/utils/api'

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

export const listAbsensiAktifitasApi = async ({
  jwt,
  page = 1,
  idKelas,
  id,
}: {
  jwt: string
  page?: number
  idKelas: string
  id: string
}) =>
  makeJwtGetRequestTableApi<DataType>(
    `${process.env.NEXT_PUBLIC_API_URL}/pengajar/kelas/${idKelas}/aktifitas/${id}/absensi`,
    jwt,
    {
      current_page: page,
      per_page: 100,
    }
  )
