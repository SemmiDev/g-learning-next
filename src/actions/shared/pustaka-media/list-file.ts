'use server'

import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import { SortType } from '@/hooks/use-table-async'
import {
  makeActionResponse,
  makeJwtGetRequestTableAction,
  makeTableActionResponse,
} from '@/utils/action'
import { getServerSession } from 'next-auth'

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
  id_instansi: string
  created_at: string
  updated_at: string
  total_files: number
}

export const listFileAction = async ({
  page = 1,
  search = '',
  personal,
  idInstansi,
  idFolder,
  sort,
  jenis,
}: {
  page?: number
  search?: string
  personal?: boolean
  idInstansi?: string
  idFolder?: string
  sort?: SortType
  jenis?: string
}) => {
  const { user } = async(await getServerSession(authOptions)) ?? {}
  if (!user) return makeTableActionResponse<DataType>(makeActionResponse(false))

  return await makeJwtGetRequestTableAction<DataType>(
    `${process.env.API_URL}/pustaka-media`,
    {
      current_page: page,
      keyword: search,
      sort_by: sort?.name,
      order: sort?.order,
      per_page: 20,
      personal: personal ? 'true' : undefined,
      id_instansi: idInstansi,
      id_parent: idFolder,
      jenis: jenis,
    }
  )
}
