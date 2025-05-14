import { BlokirPenggunaFormSchema } from '@/components/pages/instansi/profil/pengguna/modal/blokir'
import { makeJwtPostRequestApi } from '@/utils/api'

export const blokirPenggunaApi = async (
  jwt: string,
  id: string,
  data: BlokirPenggunaFormSchema
) =>
  makeJwtPostRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/instansi/blokir-pengguna`,
    jwt,
    {
      id: id,
      keterangan: data.alasan,
    }
  )
