import { makeJwtDeleteRequestApi } from '@/utils/api'

export const hapusArtikelKnowledgeApi = async (jwt: string, id: string) =>
  makeJwtDeleteRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/knowledge/artikel/${id}`,
    jwt
  )
