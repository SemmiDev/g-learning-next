import { makeJwtPostRequestApi } from '@/utils/api'

export const simpanAbsensiAktifitasApi = async (
  jwt: string,
  idKelas: string,
  id: string,
  data: {
    id_peserta: string
    status: 'Hadir' | 'Izin' | 'Sakit' | 'Alpha'
  }[]
) =>
  makeJwtPostRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/pengajar/kelas/${idKelas}/aktifitas/${id}/absensi`,
    jwt,
    {
      peserta_kelas: data,
    }
  )
