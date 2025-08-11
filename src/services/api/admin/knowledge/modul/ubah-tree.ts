import { makeJwtPutRequestApi } from '@/utils/api'

type PayloadDataType = {
  id_modul: string
  urutan: number
  artikel: {
    id_artikel: string
    urutan: number
  }[]
}[]

export const ubahTreeKnowledgeApi = async (
  jwt: string,
  data: PayloadDataType
) =>
  makeJwtPutRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/knowledge/modul/urutan`,
    jwt,
    {
      list: data,
    }
  )
