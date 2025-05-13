import { BlokirPenggunaFormSchema } from '@/components/pages/instansi/profil/pengguna/modal/blokir'
import { makeJwtPostRequestAction } from '@/utils/action'

export const blokirPenggunaAction = async (
  id: string,
  data: BlokirPenggunaFormSchema
) =>
  makeJwtPostRequestAction(
    `${process.env.NEXT_PUBLIC_API_URL}/instansi/blokir-pengguna`,
    {
      id: id,
      keterangan: data.alasan,
    }
  )
