import { makeJwtPostRequestAction } from '@/utils/action'

export const keluarKelasAction = async (id: string) =>
  makeJwtPostRequestAction(
    `${process.env.NEXT_PUBLIC_API_URL}/kelas-publik/${id}/keluar`
  )
