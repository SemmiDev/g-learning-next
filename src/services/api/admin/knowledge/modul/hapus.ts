import { makeJwtDeleteRequestApi } from '@/utils/api'

export const hapusModulKnowledgeApi = async (jwt: string, id: string) =>
  makeJwtDeleteRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/knowledge/modul/${id}`,
    jwt
  )
