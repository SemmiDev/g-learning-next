import { NilaiTugasFormSchema } from '@/components/pages/pengguna/ruang-kelas/umum/kelas/tugas/pengajar/penilaian/body'
import { makeJwtPostRequestApi } from '@/utils/api'
import { cleanQuill } from '@/utils/string'

export const simpanNilaiTugasApi = async (
  jwt: string,
  idKelas: string,
  idAktifitas: string,
  idPeserta: string,
  data: NilaiTugasFormSchema
) =>
  makeJwtPostRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/pengajar/kelas/${idKelas}/aktifitas/${idAktifitas}/penilaian-tugas`,
    jwt,
    {
      id_peserta: idPeserta,
      nilai: data.nilai,
      catatan_pengajar: cleanQuill(data.catatan),
    }
  )
