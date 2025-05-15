import { makeJwtDeleteRequestApi } from '@/utils/api'

export const hapusKelasApi = async (jwt: string, id: string) =>
  makeJwtDeleteRequestApi(`${process.env.NEXT_PUBLIC_API_URL}/kelas/${id}`, jwt)
