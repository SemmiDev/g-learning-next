import { PenilaianUjianFormSchema } from '@/components/pages/pengguna/ruang-kelas/umum/kelas/ujian/pengajar/penilaian/body'
import { makeJwtPostRequestApi } from '@/utils/api'

export const simpanNilaiUjianApi = async (
  jwt: string,
  idKelas: string,
  idAktifitas: string,
  idPeserta: string,
  data: PenilaianUjianFormSchema
) =>
  makeJwtPostRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/pengajar/kelas/${idKelas}/aktifitas/${idAktifitas}/jawaban/${idPeserta}`,
    jwt,
    {
      soal: data.nilai.map((item) => ({
        id: item.id,
        nilai: item.value,
      })),
    }
  )
