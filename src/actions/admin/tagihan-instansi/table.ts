'use server'

import { ControlledAsyncTableActionProps } from '@/components/ui/controlled-async-table'
import { makeJwtGetRequestTableAction } from '@/utils/action'

export type DataType = {
  id: string
  id_instansi: string
  id_paket_instansi: string
  id_paket_pengguna: string | null
  nomor_invoice: string
  total_tagihan: number
  tanggal_tagihan: string
  bulan_tagihan: number
  tahun_tagihan: number
  status_tagihan: 'Belum Lunas' | 'Lunas'
  jatuh_tempo: string
  created_at: string
  updated_at: string
  nama_instansi: string
  nama_paket: string
  jenis_paket: string
}

export const tableTagihanInstansiAction = async ({
  page = 1,
  search = '',
  sort,
}: ControlledAsyncTableActionProps = {}) =>
  makeJwtGetRequestTableAction<DataType>(
    `${process.env.API_URL}/admin/tagihan-instansi`,
    {
      current_page: page,
      keyword: search,
      sort_by: sort?.name,
      order: sort?.order,
    }
  )
