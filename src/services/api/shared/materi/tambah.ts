import { TambahMateriFormSchema } from '@/components/shared/materi/modal/tambah-materi'
import { makeJwtPostRequestApi } from '@/utils/api'
import { cleanQuill } from '@/utils/string'

export const tambahMateriApi = async (
  jwt: string,
  idKategori: string,
  data: TambahMateriFormSchema
) =>
  makeJwtPostRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/kategori-bank-ajar/${idKategori}/bank-ajar`,
    jwt,
    {
      judul: data.judul,
      deskripsi: cleanQuill(data.catatan),
      tipe: data.tipe,
      id_berkas: (data.berkas ?? []).map((berkas) => berkas.id),
    }
  )
