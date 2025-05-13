import { makeJwtDeleteRequestAction } from '@/utils/action'

export const hapusAktifitasAction = async (idKelas: string, id: string) =>
  makeJwtDeleteRequestAction(
    `${process.env.NEXT_PUBLIC_API_URL}/kelas/${idKelas}/aktifitas/${id}`
  )
