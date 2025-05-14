import { makeActionResponse, makeTableActionResponse } from '@/utils/action'
import { makeJwtGetRequestTableApi } from '@/utils/api'

export type DataType = {
  id: string
  id_parent: string | null
  id_pengguna: string
  nama: string
  foto: string
  diskusi: string
  jumlah_balasan: number
  created_at: string
  balasan: []
}

export const listKomentarParentApi = async ({
  jwt,
  page = 1,
  perPage,
  idKelas,
  idAktifitas,
}: {
  jwt: string
  page?: number
  perPage?: number
  idKelas: string
  idAktifitas: string
}) => {
  if (!jwt) return makeTableActionResponse<DataType>(makeActionResponse(false))

  return await makeJwtGetRequestTableApi<DataType>(
    `${process.env.NEXT_PUBLIC_API_URL}/kelas/${idKelas}/aktifitas/${idAktifitas}/diskusi`,
    jwt,
    {
      current_page: page,
      per_page: perPage,
    }
  )
}
