'use server'

import { makeJwtGetRequestTableAction } from '@/utils/action'

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

export const listPesertaKelasAction = async ({
  page = 1,
  search = '',
  idKelas,
}: {
  page?: number
  search?: string
  idKelas?: string
}) =>
  makeJwtGetRequestTableAction<DataType>(
    `${process.env.API_URL}/pengajar/kelas/${idKelas}/peserta-kelas`,
    {
      current_page: page,
      keyword: search,
      per_page: 8,
    }
  )
