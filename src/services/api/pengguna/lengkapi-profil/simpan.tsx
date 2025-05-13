import { LengkapiProfilFormSchema } from '@/components/pages/pengguna/lengkapi-profil/body'
import { ActionResponseType, makeJwtPutRequestAction } from '@/utils/action'

export const simpanDataProfilAction = async (
  data: LengkapiProfilFormSchema
): Promise<ActionResponseType> => {
  const { success, message, error } = await makeJwtPutRequestAction(
    `${process.env.NEXT_PUBLIC_API_URL}/pengguna`,
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
