'use server'

import { ControlledAsyncTableActionProps } from '@/components/ui/controlled-async-table'
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

export const listPesertaKelasAction = async ({
  page = 1,
  search = '',
  params,
}: ControlledAsyncTableActionProps = {}) =>
  makeJwtGetRequestTableAction<DataType>(
    `${process.env.API_URL}/pengajar/kelas/${params?.idKelas}/peserta-kelas`,
    {
      current_page: page,
      keyword: search,
      status: 'Diterima',
    }
  )
