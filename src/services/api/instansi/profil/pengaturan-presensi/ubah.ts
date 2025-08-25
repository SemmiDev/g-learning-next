import { PengaturanPresensiFormSchema } from '@/components/pages/instansi/pengaturan/presensi-tab'
import { ActionResponseType } from '@/utils/action'
import { makeJwtPutRequestApi } from '@/utils/api'

export const ubahPengaturanPresensiApi = async (
  jwt: string,
  data: PengaturanPresensiFormSchema
): Promise<ActionResponseType> => {
  const [
    {
      success: successPengaturan,
      error: errorPengaturan,
      message: messagePengaturan,
    },
    {
      success: successPengaturanAbsensi,
      error: errorPengaturanAbsensi,
      message: messagePengaturanAbsensi,
    },
  ] = await Promise.all([
    makeJwtPutRequestApi(
      `${process.env.NEXT_PUBLIC_API_URL}/instansi/pengaturan`,
      jwt,
      {
        pengaturan_absensi_dosen_simpeg: !data.aktif,
      }
    ),
    makeJwtPutRequestApi(
      `${process.env.NEXT_PUBLIC_API_URL}/instansi/pengaturan-absensi`,
      jwt,
      {
        absensi_dosen: data.absensiPengajar,
        absensi_mahasiswa: data.absensiPeserta,
      }
    ),
  ])

  return {
    success: successPengaturan && successPengaturanAbsensi,
    error: errorPengaturan || errorPengaturanAbsensi,
    message: messagePengaturan || messagePengaturanAbsensi,
  }
}
