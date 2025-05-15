import { TambahInformasiFormSchema } from '@/components/pages/pengguna/ruang-kelas/umum/kelas/diskusi/modal/tambah-informasi'
import { makeJwtPostRequestApi } from '@/utils/api'
import { cleanQuill } from '@/utils/string'

export const tambahAktifitasInformasiApi = async (
  jwt: string,
  idKelas: string,
  data: TambahInformasiFormSchema
) =>
  makeJwtPostRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/kelas/${idKelas}/aktifitas`,
    jwt,
    {
      judul: data.judul,
      deskripsi: cleanQuill(data.catatan),
      tipe: 'Pengumuman',
      jadwal: data.jadwal,
      berkas: (data.berkas ?? []).map((item) => item.id),
    }
  )
