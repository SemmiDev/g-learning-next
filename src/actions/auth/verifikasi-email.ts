'use server'

import { makeBasicPostRequestAction } from '@/utils/action'

export const verifikasiEmailAction = async (token: string) =>
  makeBasicPostRequestAction(`${process.env.API_URL}/email/verifikasi`, {
    token: token,
  })
