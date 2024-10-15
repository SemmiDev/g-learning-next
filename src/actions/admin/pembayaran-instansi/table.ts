'use server'

import { ControlledAsyncTableActionProps } from '@/components/ui/controlled-async-table'
import { makeJwtGetRequestTableAction } from '@/utils/action'

export type DataType = {
  id: string
  id_instansi: string
  id_paket_instansi: string
  tanggal_pembayaran: string
  nominal: number
  nomor_pesanan: string
  nomor_invoice: string
  status: string
  jenis_pembayaran: string
  nama_instansi: string
  nama_paket: string
}

export const tablePembayaranInstansiAction = async ({
  page = 1,
  search = '',
  sort,
}: ControlledAsyncTableActionProps = {}) =>
  makeJwtGetRequestTableAction<DataType>(
    `${process.env.API_URL}/admin/pembayaran`,
    {
      current_page: page,
      keyword: search,
      sort_by: sort?.name,
      order: sort?.order,
    }
  )
