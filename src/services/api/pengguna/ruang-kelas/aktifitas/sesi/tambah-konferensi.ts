import { TambahKonferensiSesiFormSchema } from '@/components/pages/pengguna/ruang-kelas/akademik/kelas/sesi-pembelajaran/sesi/pengajar/modal/tambah-konferensi'
import { makeJwtPostRequestAction } from '@/utils/action'
import { cleanQuill } from '@/utils/string'

export const tambahAktifitasKonferensiSesiAction = async (
  idKelas: string,
  idSesi: string,
  data: TambahKonferensiSesiFormSchema
) =>
  makeJwtPostRequestAction(
    `${process.env.NEXT_PUBLIC_API_URL}/kelas/${idKelas}/aktifitas`,
    {
      judul: data.judul,
      deskripsi: cleanQuill(data.catatan),
      tipe: 'Konferensi',
      link: data.link,
      id_pertemuan_kelas: idSesi,
    }
  )
