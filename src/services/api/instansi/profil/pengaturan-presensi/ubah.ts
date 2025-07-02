import { PengaturanPresensiFormSchema } from '@/components/pages/instansi/profil/pengaturan-presensi/body'
import { makeJwtPutRequestApi } from '@/utils/api'

export const ubahPengaturanPresensiApi = async (
  jwt: string,
  data: PengaturanPresensiFormSchema
) =>
  makeJwtPutRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/instansi/pengaturan-absensi`,
    jwt,
    {
      absensi_dosen: data.absensiPengajar,
      absensi_mahasiswa: data.absensiPeserta,
    }
  )
