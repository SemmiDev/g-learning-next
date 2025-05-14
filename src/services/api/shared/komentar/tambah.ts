import { makeJwtPostRequestApi } from '@/utils/api'

export const tambahKomentarApi = async (
  jwt: string,
  idKelas: string,
  idAktifitas: string,
  komentar: string,
  idParent?: string
) =>
  makeJwtPostRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/kelas/${idKelas}/aktifitas/${idAktifitas}/diskusi`,
    jwt,
    {
      diskusi: komentar,
      id_induk: idParent,
    }
  )
