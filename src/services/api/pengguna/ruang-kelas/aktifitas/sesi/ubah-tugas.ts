import { UbahTugasSesiFormSchema } from '@/components/pages/pengguna/ruang-kelas/akademik/kelas/sesi-pembelajaran/sesi/pengajar/modal/ubah-tugas'
import { makeJwtPutRequestAction } from '@/utils/action'
import { cleanQuill } from '@/utils/string'

export const ubahAktifitasTugasSesiAction = async (
  idKelas: string,
  id: string,
  data: UbahTugasSesiFormSchema
) =>
  makeJwtPutRequestAction(
    `${process.env.NEXT_PUBLIC_API_URL}/kelas/${idKelas}/aktifitas/${id}`,
    {
      judul: data.judul,
      deskripsi: cleanQuill(data.catatan),
      berkas: (data.berkas ?? []).map((item) => item.id),
      tipe: 'Penugasan',
      batas_waktu: data.batasWaktu ?? '',
    }
  )
