'use server'

import { makeJwtPostRequestAction } from '@/utils/action'

export const simpanTokenAction = async ({
  accessToken,
  refreshToken,
  expiry,
}: {
  accessToken: string
  refreshToken: string
  expiry: number
}) =>
  makeJwtPostRequestAction(`${process.env.API_URL}/oauth/conferences`, {
    access_token: accessToken,
    refresh_token: refreshToken,
    expiry_timestamp: expiry,
    jenis_integrasi: 'ZOOM',
  })
