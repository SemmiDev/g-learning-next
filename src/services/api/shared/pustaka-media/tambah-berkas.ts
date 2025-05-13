import { makeJwtPostRequestAction } from '@/utils/action'

export const tambahBerkasAction = async (formData: FormData) =>
  makeJwtPostRequestAction(
    `${process.env.NEXT_PUBLIC_API_URL}/pustaka-media/berkas`,
    formData
  )
