'use server'

import { ControlledAsyncTableActionProps } from '@/components/ui/controlled-async-table'
import { makeJwtGetRequestTableAction } from '@/utils/action'

export type DataType = {
  id: string
  id_tagihan: string
  tanggal_pembayaran: string
  jumlah_pembayaran: number
  nomor_pembayaran: string
  jenis_pembayaran: 'Manual' | 'Winpay' | 'Lainnya'
  created_at: string
  updated_at: string
}

export const tablePembayaranTagihanPenggunaAction = async ({
  page = 1,
  search = '',
  sort,
  params,
}: ControlledAsyncTableActionProps = {}) =>
  makeJwtGetRequestTableAction<DataType>(
    `${process.env.API_URL}/admin/tagihan-pengguna/${params?.idTagihan}/pembayaran`,
    {
      current_page: page,
      keyword: search,
      sort_by: sort?.name,
      order: sort?.order,
    }
  )
