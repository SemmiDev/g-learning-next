import { makeJwtDeleteRequestAction } from '@/utils/action'

export const hapusKelasAction = async (id: string) =>
  makeJwtDeleteRequestAction(`${process.env.NEXT_PUBLIC_API_URL}/kelas/${id}`)
