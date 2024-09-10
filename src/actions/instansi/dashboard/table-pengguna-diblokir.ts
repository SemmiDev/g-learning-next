'use server'

import { ControlledAsyncTableActionProps } from '@/components/ui/controlled-async-table'
import { makeJwtGetRequestTableAction } from '@/utils/action'

type DataType = {
  id: string
  nama: string
  jenis_akun: string
  tanggal_blokir: string
  keterangan_blokir: string
}

export const tablePenggunaDiblokirAction = async ({
  page = 1,
  search = '',
  sort,
}: ControlledAsyncTableActionProps) =>
  makeJwtGetRequestTableAction<DataType>(
    `${process.env.API_URL}/instansi/pengguna-blokir`,
    {
      current_page: page,
      keyword: search,
      sort_by: sort?.name,
      order: sort?.direction,
    }
  )
