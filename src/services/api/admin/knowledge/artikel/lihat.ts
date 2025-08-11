import { makeJwtGetRequestApi } from '@/utils/api'

export type DataType = {
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

export const lihatArtikelKnowledgeApi = async (jwt: string, id: string) =>
  makeJwtGetRequestApi<DataType>(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/knowledge/artikel/${id}`,
    jwt
  )
