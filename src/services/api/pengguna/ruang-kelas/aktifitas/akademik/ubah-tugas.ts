import { UbahTugasFormSchema } from '@/components/pages/pengguna/ruang-kelas/akademik/kelas/linimasa/modal/ubah-tugas'
import { makeJwtPutRequestApi } from '@/utils/api'
import { cleanQuill } from '@/utils/string'

export const ubahAktifitasTugasApi = async (
  jwt: string,
  idKelas: string,
  id: string,
  data: UbahTugasFormSchema
) =>
  makeJwtPutRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/kelas/${idKelas}/aktifitas/${id}`,
    jwt,
    {
      judul: data.judul,
      deskripsi: cleanQuill(data.catatan),
      berkas: (data.berkas ?? []).map((item) => item.id),
      tipe: 'Penugasan',
      batas_waktu: data.batasWaktu ?? '',
    }
  )
