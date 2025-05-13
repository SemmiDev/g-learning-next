'use server'

import { ControlledAsyncTableApiProps } from '@/components/ui/controlled-async-table'
import { makeJwtGetRequestTableApi } from '@/utils/api'

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

export const tablePembayaranTagihanPenggunaApi = async ({
  jwt = '',
  page = 1,
  search = '',
  sort,
  params,
}: ControlledAsyncTableApiProps = {}) =>
  makeJwtGetRequestTableApi<DataType>(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/tagihan-pengguna/${params?.idTagihan}/pembayaran`,
    jwt,
    {
      current_page: page,
      keyword: search,
      sort_by: sort?.name,
      order: sort?.order,
    }
  )
