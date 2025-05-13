import { makeJwtPutRequestAction } from '@/utils/action'

export const ubahFotoAction = async (formData: FormData) =>
  makeJwtPutRequestAction(
    `${process.env.NEXT_PUBLIC_API_URL}/pengguna/foto-profil`,
    formData
  )
