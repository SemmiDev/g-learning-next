import { TambahKonferensiFormSchema } from '@/components/pages/pengguna/ruang-kelas/akademik/kelas/linimasa/modal/tambah-konferensi'
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
      jadwal: data.jadwal,
      tipe_konferensi:
        data.tipeLink === 'otomatis' ? data.generateLink : undefined,
      link: data.tipeLink === 'manual' ? data.link : undefined,
    }
  )
