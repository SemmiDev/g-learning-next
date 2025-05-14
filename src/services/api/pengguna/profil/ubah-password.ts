import { UbahPasswordFormSchema } from '@/components/pages/pengguna/profil/modal/ubah-password'
import { makeJwtPostRequestApi } from '@/utils/api'

export const ubahPassowrdApi = async (
  jwt: string,
  data: UbahPasswordFormSchema
) =>
  makeJwtPostRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/pengguna/ubah-password`,
    jwt,
    {
      kata_sandi_lama: data.passwordLama,
      kata_sandi_baru: data.passwordBaru,
      ulangi_kata_sandi_baru: data.ulangiPassword,
    }
  )
