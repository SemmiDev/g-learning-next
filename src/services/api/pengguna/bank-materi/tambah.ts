import { TambahMateriFormSchema } from '@/components/pages/pengguna/bank-materi/kategori/modal/tambah-materi'
import { makeJwtPostRequestAction } from '@/utils/action'
import { cleanQuill } from '@/utils/string'

export const tambahBankMateriAction = async (
  idKategori: string,
  data: TambahMateriFormSchema
) =>
  makeJwtPostRequestAction(
    `${process.env.NEXT_PUBLIC_API_URL}/kategori-bank-ajar/${idKategori}/bank-ajar`,
    {
      judul: data.judul,
      deskripsi: cleanQuill(data.catatan),
      tipe: data.tipe,
      id_berkas: (data.berkas ?? []).map((berkas) => berkas.id),
    }
  )
