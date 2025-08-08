import { TambahModulFormSchema } from '@/components/pages/admin/manajemen-knowledge/modal/tambah-modul'
import { makeJwtPostRequestApi } from '@/utils/api'

type DataType = {
  id: string
  nama: string
  slug: string
  urutan: number
  created_at: string
  updated_at: string
}

export const tambahModulKnowledgeApi = async (
  jwt: string,
  data: TambahModulFormSchema
) =>
  makeJwtPostRequestApi<DataType>(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/knowledge/modul`,
    jwt,
    {
      nama: data.nama,
    }
  )
