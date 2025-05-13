import { BlokirPenggunaFormSchema } from '@/components/pages/admin/pengguna/modal/blokir'
import { makeJwtPostRequestApi } from '@/utils/api'

export const blokirPenggunaApi = async (
  jwt: string,
  id: string,
  data: BlokirPenggunaFormSchema
) =>
  makeJwtPostRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/blokir-pengguna`,
    jwt,
    {
      id: id,
      keterangan: data.alasan,
    }
  )
