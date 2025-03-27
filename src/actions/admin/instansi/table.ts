'use server'

import { ControlledAsyncTableActionProps } from '@/components/ui/controlled-async-table'
import { makeJwtGetRequestTableAction } from '@/utils/action'

export type DataType = {
  id: string
  nama: string
  nama_pimpinan: string
  telepon_pimpinan: string
  telepon_instansi: string
  jenis: string
  id_paket: string
  nama_paket: string
  semester_aktif: string
  jatuh_tempo: string
  jumlah_pengguna: number
  jumlah_penyimpanan_terpakai: number
  jumlah_kelas: number
  batas_penyimpanan: number
  batas_pengguna: number
  batas_kelas: number
  tipe: string
}

export const tableInstansiAction = async ({
  page = 1,
  search = '',
  sort,
}: ControlledAsyncTableActionProps = {}) =>
  makeJwtGetRequestTableAction<DataType>(
    `${process.env.API_URL}/admin/instansi`,
    {
      current_page: page,
      keyword: search,
      sort_by: sort?.name,
      order: sort?.order,
    }
  )
