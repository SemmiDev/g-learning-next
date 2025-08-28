import { makeJwtGetRequestApi } from '@/utils/api'

type DataType = {
  id: string
  nama: string
  artikel: {
    id: string
    id_modul: string
    judul: string
    level: string
  }[]
}

type ListDataType = {
  list: DataType[]
}

export const listModulKnowledgeApi = async (jwt: string) =>
  makeJwtGetRequestApi<ListDataType>(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/knowledge/modul`,
    jwt
  )
