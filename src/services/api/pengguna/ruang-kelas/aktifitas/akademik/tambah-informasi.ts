import { TambahInformasiFormSchema } from '@/components/pages/pengguna/ruang-kelas/akademik/kelas/linimasa/modal/tambah-informasi'
import { makeJwtPostRequestAction } from '@/utils/action'
import { cleanQuill } from '@/utils/string'

export const tambahAktifitasInformasiAction = async (
  idKelas: string,
  data: TambahInformasiFormSchema
) =>
  makeJwtPostRequestAction(
    `${process.env.NEXT_PUBLIC_API_URL}/kelas/${idKelas}/aktifitas`,
    {
      judul: data.judul,
      deskripsi: cleanQuill(data.catatan),
      tipe: 'Pengumuman',
      jadwal: data.jadwal,
      berkas: (data.berkas ?? []).map((item) => item.id),
    }
  )
