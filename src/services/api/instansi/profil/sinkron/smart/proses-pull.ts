import { makeJwtPostRequestAction } from '@/utils/action'

export const prosesPullSmartAction = async (semester: string) =>
  makeJwtPostRequestAction(
    `${process.env.NEXT_PUBLIC_API_URL}/instansi/singkronisasi?semester=${semester}`
  )
