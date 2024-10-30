'use server'

import { makeJwtGetRequestTableAction } from '@/utils/action'

export type DataType = {
  id: string
  id_kelas: string
  id_peserta: string
  status: 'Pengajuan' | 'Dikeluarkan' | 'Diterima'
  created_at: string
  updated_at: string
  nama: string
  email: string
  username: string
  foto: string
}

export const listPermintaanBergabungKelasAction = async ({
  page = 1,
  idKelas,
}: {
  page?: number
  idKelas: string
}) =>
  makeJwtGetRequestTableAction<DataType>(
    `${process.env.API_URL}/pengajar/kelas/${idKelas}/peserta-kelas`,
    {
      current_page: page,
      per_page: 20,
      status: 'Pengajuan',
    }
  )
