'use server'

import { ControlledAsyncTableActionProps } from '@/components/ui/controlled-async-table'
import { makeJwtGetRequestTableAction } from '@/utils/action'

export type DataType = {
  id: string
  id_kelas: string
  id_pertemuan_kelas: string
  id_peserta: string
  status: string | null
  latitude: string | null
  longitude: string | null
  swafoto: string | null
  created_at: string
  updated_at: string
  username: string
  nama: string
  email: string
  swafoto_url: string | null
  foto: string
}

export const tablePresensiPesertaSesiAction = async ({
  page = 1,
  search = '',
  sort,
  perPage,
  params,
}: ControlledAsyncTableActionProps = {}) =>
  makeJwtGetRequestTableAction<DataType>(
    `${process.env.API_URL}/kelas-akademik/${params?.idKelas}/pertemuan/${params?.idSesi}/absensi-peserta`,
    {
      current_page: page,
      keyword: search,
      sort_by: sort?.name,
      order: sort?.order,
      per_page: perPage,
    }
  )
