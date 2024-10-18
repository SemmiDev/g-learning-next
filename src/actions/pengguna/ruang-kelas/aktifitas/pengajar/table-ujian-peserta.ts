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
  email: string
  status_pengumpulan: string
  waktu_pengumpulan: string | null
  selesai: number | null
  skor_benar: number | null
  skor_salah: number | null
  skor_kosong: number | null
}

export const tableUjianPesertaAction = async ({
  page = 1,
  search = '',
  sort,
  params,
  filters,
}: ControlledAsyncTableActionProps) =>
  makeJwtGetRequestTableAction<DataType>(
    `${process.env.API_URL}/pengajar/kelas/${params?.idKelas}/aktifitas/${params?.idAktifitas}/penilaian-ujian`,
    {
      current_page: page,
      keyword: search,
      sort_by: sort?.name,
      order: sort?.order,
      per_page: 5,
      status: mustBe(
        filters?.status,
        ['SUDAH_MENGUMPULKAN', 'BELUM_MENGUMPULKAN', undefined],
        undefined
      ),
    }
  )
