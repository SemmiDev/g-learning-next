'use server'

import { ControlledAsyncTableActionProps } from '@/components/ui/controlled-async-table'
import { makeJwtGetRequestTableAction } from '@/utils/action'

type DataType = {
  id: string
  nama: string
  jenis_akun: string
  jumlah_kelas: number
  batas_kelas: number
  jumlah_penyimpanan: number
  batas_penyimpanan: number
}

export const tablePenggunaAction = async ({
  page = 1,
  search = '',
  sort,
}: ControlledAsyncTableActionProps) =>
  makeJwtGetRequestTableAction<DataType>(
    `${process.env.API_URL}/instansi/pengguna`,
    {
      current_page: page,
      keyword: search,
      sort_by: sort?.name,
      order: sort?.order,
    }
  )
