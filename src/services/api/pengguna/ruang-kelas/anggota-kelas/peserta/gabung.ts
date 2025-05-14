import { makeJwtPostRequestApi } from '@/utils/api'

export const gabungAnggotaKelasApi = async (jwt: string, kode: string) =>
  makeJwtPostRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/peserta/kelas/bergabung?kode_kelas=${kode}`,
    jwt
  )
