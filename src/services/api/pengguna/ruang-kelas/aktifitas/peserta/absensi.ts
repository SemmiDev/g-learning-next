import { makeJwtPostRequestApi } from '@/utils/api'

export const absensiPesertaApi = async (
  jwt: string,
  idKelas: string,
  idAktifitas: string,
  formData: FormData
) =>
  makeJwtPostRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/peserta/kelas/${idKelas}/aktifitas/${idAktifitas}/absensi`,
    jwt,
    formData
  )
