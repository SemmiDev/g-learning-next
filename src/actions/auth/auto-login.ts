'use server'

import { makeBasicPostRequestAction } from '@/utils/action'

type DataType = {
  pengguna: {
    username: string
    nama: string
    foto: string
  }
  id_kelas: string
  captcha: boolean
  peran: 'Peserta' | 'Pengajar'
  token: {
    access_token: string
    access_token_expired_at: string
    refresh_token: string
    refresh_token_expired_at: string
  }
}

export const autoLoginAction = async (token: string, from: string) =>
  makeBasicPostRequestAction<DataType>(
    `${process.env.API_URL}/auth/masuk-otomatis`,
    {
      token,
      from,
    }
  )
