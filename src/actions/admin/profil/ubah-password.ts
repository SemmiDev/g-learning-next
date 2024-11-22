'use server'

import { UbahPasswordFormSchema } from '@/components/page/pengguna/profil/modal/ubah-password'
import { makeJwtPostRequestAction } from '@/utils/action'

export const ubahPassowrdAction = async (data: UbahPasswordFormSchema) =>
  makeJwtPostRequestAction(`${process.env.API_URL}/pengguna/ubah-password`, {
    kata_sandi_lama: data.passwordLama,
    kata_sandi_baru: data.passwordBaru,
    ulangi_kata_sandi_baru: data.ulangiPassword,
  })
