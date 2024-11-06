'use server'

import { ControlledAsyncTableActionProps } from '@/components/ui/controlled-async-table'
import { makeJwtGetRequestTableAction } from '@/utils/action'

/* TODO: ganti type sesuai dgn API jika sudah ada */
export type DataType = {
  aktifitas: {
    id: string
    id_kelas: string
    id_pembuat: string
    tipe:
      | 'Diskusi'
      | 'Materi'
      | 'Konferensi'
      | 'Penugasan'
      | 'Ujian'
      | 'Pengumuman'
    kategori_nilai: 'Tugas' | 'UTS' | 'UAS' | null
    judul: string
    deskripsi: string | null
    absen: 'Manual' | 'Otomatis' | null
    waktu_tersedia: string | null
    waktu_akhir_absen: string | null
    batas_waktu: string | null
    id_bank_soal: string | null
    acak_soal_ujian: string | null
    waktu_mulai_ujian: string | null
    waktu_selesai_ujian: string | null
    durasi_ujian: string | null
    created_at: string
    updated_at: string
  }
  total_komentar: number
  bank_soal: {
    id: string
    id_kategori: string
    id_pengajar: string
    judul: string
    deskripsi: string
    bobot_benar: number
    bobot_salah: number
    bobot_kosong: number
    jumlah_soal_yang_digunakan: number
  }
}

/* TODO: ini menggunakan API umum untuk sementara, ganti dgn API yg benar jika sudah ada */
export const tableSesiUjianAction = async ({
  page = 1,
  search = '',
  sort,
  params,
}: ControlledAsyncTableActionProps = {}) =>
  makeJwtGetRequestTableAction<DataType>(
    `${process.env.API_URL}/kelas/${params?.idKelas}/aktifitas`,
    {
      current_page: page,
      keyword: search,
      sort_by: sort?.name,
      order: sort?.order,
    }
  )
