import { makeJwtDeleteRequestApi } from '@/utils/api'

export const keluarkanAnggotaKelasApi = async (
  jwt: string,
  idKelas: string,
  idPeserta: string
) =>
  makeJwtDeleteRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/pengajar/kelas/${idKelas}/peserta-kelas/${idPeserta}`,
    jwt
  )
