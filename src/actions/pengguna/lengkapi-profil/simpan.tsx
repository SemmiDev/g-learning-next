'use server'

import { LengkapiProfilFormSchema } from '@/components/page/pengguna/lengkapi-profil/body'
import { ActionPromiseType, makeJwtPutRequestAction } from '@/utils/action'

export const simpanDataProfilAction = async (
  data: LengkapiProfilFormSchema
): Promise<ActionPromiseType> => {
  const { success, message, error } = await makeJwtPutRequestAction(
    `${process.env.API_URL}/pengguna`,
    {
      nik: data.nik,
      jenis_kelamin: data.jenisKelamin,
      hp: data.kontak,
      situs_web: data.website,
      bio: data.bio,
    }
  )

  return {
    success,
    message,
    error,
  }
}
