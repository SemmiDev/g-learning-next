import { UbahArtikelFormSchema } from '@/components/pages/admin/manajemen-knowledge/form/ubah-artikel'
import { makeJwtPutRequestApi } from '@/utils/api'
import { mustBe } from '@/utils/must-be'
import { cleanQuill } from '@/utils/string'

type DataType = {
  id: string
  id_modul: string
  isi: string
  judul: string
  level: string
  slug: string
  urutan: number
  dilihat: number
  created_at: string
  updated_at: string
}

export const ubahArtikelKnowledgeApi = async (
  jwt: string,
  id: string,
  data: UbahArtikelFormSchema
) =>
  makeJwtPutRequestApi<DataType>(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/knowledge/artikel/${id}`,
    jwt,
    {
      judul: data.judul,
      isi: cleanQuill(data.isi),
      level: mustBe(
        data.level?.value,
        ['Mahasiswa', 'Dosen', 'Akademik'] as const,
        'Akademik'
      ),
    }
  )
