import { makeActionResponse, makeTableActionResponse } from '@/utils/action'
import { makeJwtGetRequestTableApi } from '@/utils/api'

export type DataType = {
  id: string
  nama_kategori: string
  id_pengguna: string
  total_materi: number
}

export const listKategoriMateriApi = async ({
  jwt,
  page = 1,
  search = '',
  tipe,
}: {
  jwt: string
  page?: number
  search?: string
  tipe?: 'Materi' | 'Penugasan'
}) => {
  if (!jwt) return makeTableActionResponse<DataType>(makeActionResponse(false))

  return await makeJwtGetRequestTableApi<DataType>(
    `${process.env.NEXT_PUBLIC_API_URL}/kategori-bank-ajar`,
    jwt,
    {
      current_page: page,
      keyword: search,
      sort_by: 'nama_kategori',
      order: 'asc',
      per_page: 20,
      tipe,
    }
  )
}
