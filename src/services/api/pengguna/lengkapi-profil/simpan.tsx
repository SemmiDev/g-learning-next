import { LengkapiProfilFormSchema } from '@/components/pages/pengguna/lengkapi-profil/body'
import { ActionResponseType } from '@/utils/action'
import { makeJwtPutRequestApi } from '@/utils/api'

export const simpanDataProfilApi = async (
  jwt: string,
  data: LengkapiProfilFormSchema
): Promise<ActionResponseType> => {
  const { success, message, error } = await makeJwtPutRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/pengguna`,
    jwt,
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
