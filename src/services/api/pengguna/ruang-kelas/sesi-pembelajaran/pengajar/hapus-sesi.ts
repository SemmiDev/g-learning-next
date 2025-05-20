import { makeJwtDeleteRequestApi } from '@/utils/api'

export const hapusSesiApi = async (jwt: string, idKelas: string, id: string) =>
  makeJwtDeleteRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/kelas-akademik/${idKelas}/pertemuan/${id}`,
    jwt
  )
