import { makeJwtGetRequestTableApi } from '@/utils/api'

export type DataType = {
  id_kelas: string
  id_peserta: string
  status: string
  created_at: string
  updated_at: string
  nama: string
  email: string
  username: string
  foto: string
}

export const listPesertaKelasApi = async ({
  jwt,
  page = 1,
  search = '',
  idKelas,
}: {
  jwt: string
  page?: number
  search?: string
  idKelas?: string
}) =>
  makeJwtGetRequestTableApi<DataType>(
    `${process.env.NEXT_PUBLIC_API_URL}/pengajar/kelas/${idKelas}/peserta-kelas`,
    jwt,
    {
      current_page: page,
      keyword: search,
      per_page: 10,
      sort_by: 'nama',
      order: 'ASC',
    }
  )
