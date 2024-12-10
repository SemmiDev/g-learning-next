'use server'

import { makeJwtPostRequestAction } from '@/utils/action'

export const prosesPullSmartAction = async (semester: string) =>
  makeJwtPostRequestAction(
    `${process.env.API_URL}/instansi/singkronisasi?semester=${semester}`
  )
