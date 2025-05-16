import { makeJwtPostRequestApi } from '@/utils/api'

export const presensiSesiNonQrApi = async (
  jwt: string,
  idKelas: string,
  idSesi: string,
  formData: FormData
) =>
  makeJwtPostRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/kelas-akademik/${idKelas}/pertemuan/${idSesi}/absensi`,
    jwt,
    formData
  )
