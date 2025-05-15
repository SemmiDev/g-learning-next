import { makeBasicPostRequestApi } from '@/utils/api'

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

export const autoLoginApi = async (token: string, from: string) =>
  makeBasicPostRequestApi<DataType>(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/masuk-otomatis`,
    {
      token,
      from,
    }
  )
