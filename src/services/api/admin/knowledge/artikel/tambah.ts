import { TambahArtikelFormSchema } from '@/components/pages/admin/manajemen-knowledge/form/tambah-artikel'
import { makeJwtPostRequestApi } from '@/utils/api'
import { mustBe } from '@/utils/must-be'

type DataType = {
  id: string
  id_modul: string
  judul: string
  isi: string
  slug: string
  urutan: number
  level: string
  dilihat: number
  created_at: string
  updated_at: string
}

export const tambahArtikelKnowledgeApi = async (
  jwt: string,
  idModul: string,
  data: TambahArtikelFormSchema
) =>
  makeJwtPostRequestApi<DataType>(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/knowledge/modul/${idModul}/artikel`,
    jwt,
    {
      judul: data.judul,
      isi: data.isi,
      level: mustBe(
        data.tipe?.value,
        ['Mahasiswa', 'Dosen', 'Akademik'] as const,
        'Akademik'
      ),
    }
  )
