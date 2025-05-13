import { makeJwtDeleteRequestAction } from '@/utils/action'

export const hapusNilaiUjianAction = async (
  idKelas: string,
  idAktifitas: string,
  idPeserta: string
) =>
  makeJwtDeleteRequestAction(
    `${process.env.NEXT_PUBLIC_API_URL}/pengajar/kelas/${idKelas}/aktifitas/${idAktifitas}/penilaian-ujian/${idPeserta}`
  )
