import { makeJwtDeleteRequestApi } from '@/utils/api'

export const hapusAktifitasApi = async (
  jwt: string,
  idKelas: string,
  id: string
) =>
  makeJwtDeleteRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/kelas/${idKelas}/aktifitas/${id}`,
    jwt
  )
