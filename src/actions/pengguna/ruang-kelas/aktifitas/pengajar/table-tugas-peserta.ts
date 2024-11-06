'use server'

import { ControlledAsyncTableActionProps } from '@/components/ui/controlled-async-table'
import { makeJwtGetRequestTableAction } from '@/utils/action'
import { mustBe } from '@/utils/must-be'

export type DataType = {
  id: string | null
  id_aktifitas: string
  id_peserta: string
  nama: string
  foto: string
  nilai: number | null
  email: string
  catatan_pengajar: string
  catatan_peserta: string
  status_pengumpulan: boolean
  waktu_pengumpulan: string | null
}

export const tableTugasPesertaAction = async ({
  page = 1,
  search = '',
  sort,
  perPage,
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
      per_page: perPage,
      status: mustBe(
        filters?.status,
        ['SUDAH_MENGUMPULKAN', 'BELUM_MENGUMPULKAN', undefined],
        undefined
      ),
    }
  )
