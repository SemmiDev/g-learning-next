import { TambahKonferensiSesiFormSchema } from '@/components/pages/pengguna/ruang-kelas/akademik/kelas/sesi-pembelajaran/sesi/pengajar/modal/tambah-konferensi'
import { makeJwtPostRequestApi } from '@/utils/api'
import { cleanQuill } from '@/utils/string'

export const tambahAktifitasKonferensiSesiApi = async (
  jwt: string,
  idKelas: string,
  idSesi: string,
  data: TambahKonferensiSesiFormSchema
) =>
  makeJwtPostRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/kelas/${idKelas}/aktifitas`,
    jwt,
    {
      judul: data.judul,
      deskripsi: cleanQuill(data.catatan),
      tipe: 'Konferensi',
      tipe_konferensi:
        data.tipeLink === 'otomatis' ? data.generateLink : undefined,
      link: data.tipeLink === 'manual' ? data.link : undefined,
      id_pertemuan_kelas: idSesi,
    }
  )
