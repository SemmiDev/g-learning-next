import { makeJwtPostRequestApi } from '@/utils/api'

export const simpanPresensiPesertaSesiApi = async (
  jwt: string,
  idKelas: string,
  idSesi: string,
  data: {
    id_peserta: string
    status: 'Hadir' | 'Izin' | 'Sakit' | 'Alpha'
  }[]
) =>
  makeJwtPostRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/kelas-akademik/${idKelas}/pertemuan/${idSesi}/absensi-peserta`,
    jwt,
    {
      peserta_kelas: data,
    }
  )
