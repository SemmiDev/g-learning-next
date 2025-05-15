import { TambahDiskusiFormSchema } from '@/components/pages/pengguna/ruang-kelas/akademik/kelas/linimasa/modal/tambah-diskusi'
import { makeJwtPostRequestApi } from '@/utils/api'
import { cleanQuill } from '@/utils/string'

export const tambahAktifitasDiskusiApi = async (
  jwt: string,
  idKelas: string,
  data: TambahDiskusiFormSchema
) =>
  makeJwtPostRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/kelas/${idKelas}/aktifitas`,
    jwt,
    {
      judul: data.judul,
      deskripsi: cleanQuill(data.catatan),
      tipe: 'Diskusi',
    }
  )
