import { makeJwtPostRequestAction } from '@/utils/action'

export const tambahKomentarAction = async (
  idKelas: string,
  idAktifitas: string,
  komentar: string,
  idParent?: string
) =>
  makeJwtPostRequestAction(
    `${process.env.NEXT_PUBLIC_API_URL}/kelas/${idKelas}/aktifitas/${idAktifitas}/diskusi`,
    {
      diskusi: komentar,
      id_induk: idParent,
    }
  )
