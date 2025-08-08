import { makeJwtGetRequestApi } from '@/utils/api'

export type DataType = {
  id: string
  nama: string
  slug: string
  urutan: number
  created_at: string
  updated_at: string
}

export const lihatModulKnowledgeApi = async (jwt: string, id: string) =>
  makeJwtGetRequestApi<DataType>(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/knowledge/modul/${id}`,
    jwt
  )
