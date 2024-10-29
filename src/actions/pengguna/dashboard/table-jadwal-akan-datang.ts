'use server'

import {
  ControlledAsyncTableActionProps,
  ControlledAsyncTableActionType,
} from '@/components/ui/controlled-async-table'
import {
  makeJwtGetRequestAction,
  makeJwtGetRequestTableAction,
} from '@/utils/action'

type DataType = {
  id_kelas: string
  nama_kelas: string
  tipe: string
  thumbnail: string
  nama_instansi: string
  tanggal_mulai: string
  tanggal_sampai: string
}

export const tableJadwalAkanDatangAction = async () =>
  makeJwtGetRequestAction<DataType[]>(
    `${process.env.API_URL}/dashboard/jadwal-kelas-mendatang`
  )
