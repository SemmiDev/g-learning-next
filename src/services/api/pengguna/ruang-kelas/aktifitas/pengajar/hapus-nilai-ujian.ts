import { makeJwtDeleteRequestApi } from '@/utils/api'

export const hapusNilaiUjianApi = async (
  jwt: string,
  idKelas: string,
  idAktifitas: string,
  idPeserta: string
) =>
  makeJwtDeleteRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/pengajar/kelas/${idKelas}/aktifitas/${idAktifitas}/penilaian-ujian/${idPeserta}`,
    jwt
  )
