import { UbahKonferensiFormSchema } from '@/components/pages/pengguna/ruang-kelas/umum/kelas/diskusi/modal/ubah-konferensi'
import { makeJwtPutRequestAction } from '@/utils/action'
import { cleanQuill } from '@/utils/string'

export const ubahAktifitasKonferensiAction = async (
  idKelas: string,
  id: string,
  data: UbahKonferensiFormSchema
) =>
  makeJwtPutRequestAction(
    `${process.env.NEXT_PUBLIC_API_URL}/kelas/${idKelas}/aktifitas/${id}`,
    {
      judul: data.judul,
      deskripsi: cleanQuill(data.catatan),
      tipe_presensi: data.presensi === 'aktif' ? 'Otomatis' : '',
      jadwal: data.jadwal ?? '',
      link: data.link,
    }
  )
