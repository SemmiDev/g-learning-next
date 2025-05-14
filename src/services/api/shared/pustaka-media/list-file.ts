import { SortType } from '@/hooks/use-table-async'
import { makeActionResponse, makeTableActionResponse } from '@/utils/action'
import { makeJwtGetRequestTableApi } from '@/utils/api'

export type DataType = {
  id: string
  id_parent: string | null
  nama: string
  deskripsi: string
  content: string
  ekstensi: string
  tipe: 'Dokumen' | 'Audio' | 'Video' | 'Gambar' | 'Folder' | 'Teks' | null
  url: string
  ukuran: number
  id_pengguna: string
  id_instansi: string | null
  google_drive: boolean
  penyimpanan: 'Internal' | 'External'
  created_at: string
  updated_at: string
  total_files: number
}

export const listFileApi = async ({
  jwt,
  page = 1,
  search = '',
  personal,
  googleDrive,
  idInstansi,
  idFolder,
  sort,
  jenis,
}: {
  jwt: string
  page?: number
  search?: string
  personal?: boolean
  googleDrive?: boolean
  idInstansi?: string
  idFolder?: string
  sort?: SortType
  jenis?: string
}) => {
  if (!jwt) return makeTableActionResponse<DataType>(makeActionResponse(false))

  return await makeJwtGetRequestTableApi<DataType>(
    `${process.env.NEXT_PUBLIC_API_URL}/pustaka-media`,
    jwt,
    {
      current_page: page,
      keyword: search,
      sort_by: sort?.name,
      order: sort?.order,
      per_page: 20,
      personal: personal ? 'true' : undefined,
      google_drive: googleDrive ? 'true' : undefined,
      id_instansi: idInstansi,
      id_parent: idFolder,
      jenis: jenis,
    }
  )
}
