'use server'

import { makeJwtPostRequestAction } from '@/utils/action'

export const simpanTokenAction = async ({
  email,
  accessToken,
  refreshToken,
  expiry,
}: {
  email: string
  accessToken: string
  refreshToken: string
  expiry: number
}) =>
  makeJwtPostRequestAction(`${process.env.API_URL}/oauth/conferences`, {
    email: email,
    access_token: accessToken,
    refresh_token: refreshToken,
    expiry_timestamp: expiry,
    jenis_integrasi: 'GOOGLE_MEET',
  })
