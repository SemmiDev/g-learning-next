'use server'

import { ControlledAsyncTableActionProps } from '@/components/ui/controlled-async-table'
import { makeJwtGetRequestTableAction } from '@/utils/action'

type DataType = {
  id: string
  nama: string
  instansi: string
  jenis_akun: string
  jumlah_penyimpanan_terpakai: number
  batas_penyimpanan: number
  jumlah_kelas_terpakai: number
  batas_kelas: number
}

export const tablePenggunaInstansiAction = async ({
  page = 1,
  search = '',
  sort,
  params,
}: ControlledAsyncTableActionProps = {}) =>
  makeJwtGetRequestTableAction<DataType>(
    `${process.env.API_URL}/admin/instansi/${params?.id}/anggota`,
    {
      current_page: page,
      keyword: search,
      sort_by: sort?.name,
      order: sort?.order,
    }
  )
