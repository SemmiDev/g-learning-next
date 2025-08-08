import { UbahModulFormSchema } from '@/components/pages/admin/manajemen-knowledge/modal/ubah-modul'
import { makeJwtPutRequestApi } from '@/utils/api'

export const ubahModulKnowledgeApi = async (
  jwt: string,
  id: string,
  data: UbahModulFormSchema
) =>
  makeJwtPutRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/knowledge/modul/${id}`,
    jwt,
    {
      nama: data.nama,
    }
  )
