import { PengumpulanTugasFormSchema } from '@/components/pages/pengguna/ruang-kelas/umum/kelas/diskusi/detail-tugas/kumpulkan-card'
import { makeJwtPostRequestApi } from '@/utils/api'
import { cleanQuill } from '@/utils/string'

export const simpanPengumpulanTugasApi = async (
  jwt: string,
  idKelas: string,
  idAktifitas: string,
  data: PengumpulanTugasFormSchema
) =>
  makeJwtPostRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/peserta/kelas/${idKelas}/aktifitas/${idAktifitas}/pengumpulan-tugas`,
    jwt,
    {
      catatan: cleanQuill(data.catatan),
      berkas: data.berkas.map((berkas) => berkas.id),
    }
  )
