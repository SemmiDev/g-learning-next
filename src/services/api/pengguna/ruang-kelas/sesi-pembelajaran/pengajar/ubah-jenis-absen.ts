import { UbahJenisAbsenSesiFormSchema } from '@/components/pages/pengguna/ruang-kelas/akademik/kelas/sesi-pembelajaran/pengajar/modal/ubah-jenis-absen'
import { makeJwtPutRequestApi } from '@/utils/api'

export const ubahJenisAbsenSesiApi = async (
  jwt: string,
  idKelas: string,
  id: string,
  data: UbahJenisAbsenSesiFormSchema
) =>
  makeJwtPutRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/kelas-akademik/${idKelas}/pertemuan/${id}`,
    jwt,
    {
      jenis_absensi_peserta: data.jenis,
    }
  )
