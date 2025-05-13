import { TambahTugasSesiFormSchema } from '@/components/pages/pengguna/ruang-kelas/akademik/kelas/sesi-pembelajaran/sesi/pengajar/modal/tambah-tugas'
import { makeJwtPostRequestAction } from '@/utils/action'
import { cleanQuill } from '@/utils/string'

export const tambahAktifitasTugasSesiAction = async (
  idKelas: string,
  idSesi: string,
  data: TambahTugasSesiFormSchema
) =>
  makeJwtPostRequestAction(
    `${process.env.NEXT_PUBLIC_API_URL}/kelas/${idKelas}/aktifitas`,
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
      tipe: 'Penugasan',
      batas_waktu: data.batasWaktu,
      id_pertemuan_kelas: idSesi,
    }
  )
