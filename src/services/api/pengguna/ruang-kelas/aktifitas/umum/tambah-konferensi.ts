import { TambahKonferensiFormSchema } from '@/components/pages/pengguna/ruang-kelas/umum/kelas/diskusi/modal/tambah-konferensi'
import { makeJwtPostRequestAction } from '@/utils/action'
import { cleanQuill } from '@/utils/string'

export const tambahAktifitasKonferensiAction = async (
  idKelas: string,
  data: TambahKonferensiFormSchema
) =>
  makeJwtPostRequestAction(
    `${process.env.NEXT_PUBLIC_API_URL}/kelas/${idKelas}/aktifitas`,
    {
      judul: data.judul,
      deskripsi: cleanQuill(data.catatan),
      tipe: 'Konferensi',
      tipe_presensi: data.presensi === 'aktif' ? 'Manual' : undefined,
      jadwal: data.jadwal,
      link: data.link,
    }
  )
