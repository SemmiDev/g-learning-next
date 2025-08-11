import { UbahArtikelFormSchema } from '@/components/pages/admin/manajemen-knowledge/form/ubah-artikel'
import { makeJwtPutRequestApi } from '@/utils/api'
import { mustBe } from '@/utils/must-be'

export const ubahArtikelKnowledgeApi = async (
  jwt: string,
  id: string,
  data: UbahArtikelFormSchema
) =>
  makeJwtPutRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/knowledge/artikel/${id}`,
    jwt,
    {
      judul: data.judul,
      isi: data.isi,
      level: mustBe(
        data.level?.value,
        ['Mahasiswa', 'Dosen', 'Akademik'] as const,
        'Akademik'
      ),
    }
  )
