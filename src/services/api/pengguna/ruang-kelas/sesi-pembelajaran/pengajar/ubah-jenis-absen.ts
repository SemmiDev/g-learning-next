import { makeJwtPutRequestAction } from '@/utils/action'

export const ubahJenisAbsenSesiAction = async (
  idKelas: string,
  id: string,
  data: any
) =>
  makeJwtPutRequestAction(
    `${process.env.NEXT_PUBLIC_API_URL}/kelas-akademik/${idKelas}/pertemuan/${id}`,
    {
      jenis_absensi_peserta: data.jenis,
    }
  )
