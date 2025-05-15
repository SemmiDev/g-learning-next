import { TambahMateriFormSchema } from '@/components/pages/pengguna/ruang-kelas/akademik/kelas/linimasa/modal/tambah-materi'
import { makeJwtPostRequestApi } from '@/utils/api'
import { cleanQuill } from '@/utils/string'

export const tambahAktifitasMateriApi = async (
  jwt: string,
  idKelas: string,
  data: TambahMateriFormSchema
) =>
  makeJwtPostRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/kelas/${idKelas}/aktifitas`,
    jwt,
    {
      ...(data.share && data.materi
        ? {
            judul: data.materi.name,
            deskripsi: cleanQuill(data.materi.desc),
            berkas: data.materi.fileIds,
          }
        : {
            judul: data.judul,
            deskripsi: cleanQuill(data.catatan),
            berkas: (data.berkas ?? []).map((item) => item.id),
          }),
      tipe: 'Materi',
      waktu_akhir_absen: undefined,
      jadwal: data.jadwal,
    }
  )
