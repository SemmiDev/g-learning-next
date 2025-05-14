import { UbahMateriFormSchema } from '@/components/pages/pengguna/bank-materi/kategori/modal/ubah-materi'
import { makeJwtPutRequestApi } from '@/utils/api'
import { cleanQuill } from '@/utils/string'

export const ubahBankMateriApi = async (
  jwt: string,
  idKategori: string,
  id: string,
  data: UbahMateriFormSchema
) =>
  makeJwtPutRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/kategori-bank-ajar/${idKategori}/bank-ajar/${id}`,
    jwt,
    {
      judul: data.judul,
      deskripsi: cleanQuill(data.catatan),
      id_berkas: (data.berkas ?? []).map((berkas) => berkas.id),
    }
  )
