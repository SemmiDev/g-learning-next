'use server'

import { makeBasicPostRequestAction } from '@/utils/action'

export const verifikasiEmailAction = async (token: string) =>
  makeBasicPostRequestAction(`${process.env.API_URL}/auth/verifikasi-email`, {
    token: token,
  })
