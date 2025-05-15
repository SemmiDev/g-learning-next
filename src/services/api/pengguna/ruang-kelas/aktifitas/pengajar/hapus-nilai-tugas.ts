import { makeJwtDeleteRequestApi } from '@/utils/api'

export const hapusNilaiTugasApi = async (
  jwt: string,
  idKelas: string,
  idAktifitas: string,
  id: string
) =>
  makeJwtDeleteRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/pengajar/kelas/${idKelas}/aktifitas/${idAktifitas}/penilaian-tugas/${id}`,
    jwt
  )
