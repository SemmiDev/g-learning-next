import { makeJwtPutRequestApi } from '@/utils/api'

export const ubahJenisAbsenSesiApi = async (
  jwt: string,
  idKelas: string,
  id: string,
  data: any
) =>
  makeJwtPutRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/kelas-akademik/${idKelas}/pertemuan/${id}`,
    jwt,
    {
      jenis_absensi_peserta: data.jenis,
    }
  )
