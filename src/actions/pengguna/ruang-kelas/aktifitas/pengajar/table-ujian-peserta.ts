'use server'

import { ControlledAsyncTableActionProps } from '@/components/ui/controlled-async-table'
import { makeJwtGetRequestTableAction } from '@/utils/action'
import { mustBe } from '@/utils/must-be'

export type DataType = {
  nama: string
  foto: string
  email: string
  waktu_pengumpulan: string | null
  id: string | null
  id_kelas: string
  id_aktifitas: string
  id_peserta: string
  id_bank_soal: string | null
  jawaban: string | null
  sisa_waktu: number | null
  status_pengumpulan: 'SUDAH_MENGUMPULKAN' | 'BELUM_MENGUMPULKAN'
  status_penilaian_essay: 0 | 1 | null
  selesai: number | null
  skor_benar: number | null
  skor_salah: number | null
  skor_kosong: number | null
  skor_akhir: number | null
  skor_akhir_essay: number | null
  skor_akhir_pilihan_ganda: number | null
  jawaban_benar: number | null
  jawaban_salah: number | null
  jawaban_kosong: number | null
  waktu_mulai: string | null
  waktu_selesai: string | null
  created_at: string | null
  updated_at: string | null
}

export const tableUjianPesertaAction = async ({
  page = 1,
  search = '',
  sort,
  perPage,
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
      per_page: perPage,
      status: mustBe(
        filters?.status,
        ['SUDAH_MENGUMPULKAN', 'BELUM_MENGUMPULKAN', undefined],
        undefined
      ),
    }
  )
