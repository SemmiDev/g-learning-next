import { makeJwtPostRequestAction } from '@/utils/action'

export const akhiriSesiAction = async (idKelas: string, idSesi: string) =>
  makeJwtPostRequestAction(
    `${process.env.NEXT_PUBLIC_API_URL}/kelas-akademik/${idKelas}/pertemuan/${idSesi}/akhiri-sesi`
  )
