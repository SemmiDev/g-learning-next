import { makeJwtPostRequestApi } from '@/utils/api'

export const akhiriSesiApi = async (
  jwt: string,
  idKelas: string,
  idSesi: string
) =>
  makeJwtPostRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/kelas-akademik/${idKelas}/pertemuan/${idSesi}/akhiri-sesi`,
    jwt
  )
