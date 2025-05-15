import { TambahKonferensiFormSchema } from '@/components/pages/pengguna/ruang-kelas/umum/kelas/diskusi/modal/tambah-konferensi'
import { makeJwtPostRequestApi } from '@/utils/api'
import { cleanQuill } from '@/utils/string'

export const tambahAktifitasKonferensiApi = async (
  jwt: string,
  idKelas: string,
  data: TambahKonferensiFormSchema
) =>
  makeJwtPostRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/kelas/${idKelas}/aktifitas`,
    jwt,
    {
      judul: data.judul,
      deskripsi: cleanQuill(data.catatan),
      tipe: 'Konferensi',
      tipe_presensi: data.presensi === 'aktif' ? 'Manual' : undefined,
      jadwal: data.jadwal,
      link: data.link,
    }
  )
