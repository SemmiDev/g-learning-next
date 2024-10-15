'use server'

import { ControlledAsyncTableActionProps } from '@/components/ui/controlled-async-table'
import { makeJwtGetRequestTableAction } from '@/utils/action'

export type DataType = {
  id: string | null
  id_aktifitas: string
  id_peserta: string
  nama: string
  foto: string
  nilai: number | null
  catatan_pengajar: string
  catatan_peserta: string
  status_pengumpulan: boolean
  waktu_pengumpulan: string | null
}

export const tableTugasPesertaAction = async ({
  page = 1,
  search = '',
  sort,
  params,
  filters,
}: ControlledAsyncTableActionProps) =>
  makeJwtGetRequestTableAction<DataType>(
    `${process.env.API_URL}/pengajar/kelas/${params?.idKelas}/aktifitas/${params?.idAktifitas}/penilaian-tugas`,
    {
      current_page: page,
      keyword: search,
      sort_by: sort?.name,
      order: sort?.order,
      per_page: 5,
      status: filters?.status,
    }
  )
