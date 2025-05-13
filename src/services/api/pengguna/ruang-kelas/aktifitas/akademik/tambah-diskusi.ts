import { TambahDiskusiFormSchema } from '@/components/pages/pengguna/ruang-kelas/akademik/kelas/linimasa/modal/tambah-diskusi'
import { makeJwtPostRequestAction } from '@/utils/action'
import { cleanQuill } from '@/utils/string'

export const tambahAktifitasDiskusiAction = async (
  idKelas: string,
  data: TambahDiskusiFormSchema
) =>
  makeJwtPostRequestAction(
    `${process.env.NEXT_PUBLIC_API_URL}/kelas/${idKelas}/aktifitas`,
    {
      judul: data.judul,
      deskripsi: cleanQuill(data.catatan),
      tipe: 'Diskusi',
    }
  )
