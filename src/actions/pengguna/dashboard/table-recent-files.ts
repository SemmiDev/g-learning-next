'use server'

import { makeJwtGetRequestTableAction } from '@/utils/action'

export type DataType = {
  id: string
  id_parent: string | null
  nama: string
  deskripsi: string
  content: string
  ekstensi: string
  tipe: string
  url: string
  ukuran: number
  id_pengguna: string
  id_instansi: string | null
  created_at: string
  updated_at: string
}

export const listRecentFilesAction = async ({
  page = 1,
  perPage,
  personal,
  googleDrive,
  idInstansi,
}: {
  page?: number
  perPage?: number
  personal?: boolean
  googleDrive?: boolean
  idInstansi?: string
}) =>
  makeJwtGetRequestTableAction<DataType>(
    `${process.env.API_URL}/dashboard/recent-files`,
    {
      current_page: page,
      per_page: perPage,
      personal: personal ? 'true' : undefined,
      google_drive: googleDrive ? 'true' : undefined,
      id_instansi: idInstansi,
    }
  )
