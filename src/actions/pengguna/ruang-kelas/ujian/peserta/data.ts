'use server'

import { makeJwtGetRequestAction } from '@/utils/action'

export type DataType = {
  soal: {
    id: string
    id_bank_soal: string
    soal: string
    jawaban_a: string
    jawaban_b: string
    jawaban_c: string
    jawaban_d: string
    jawaban_e: string
    created_at: string
    updated_at: string
    telah_dijawab: boolean
    jawaban_anda: 'A' | 'B' | 'C' | 'D' | 'E' | ''
  }[]
  info: {
    jumlah_soal: number
    sudah_dijawab: number
    belum_dijawab: number
    durasi: number
  }
  sisa_durasi: number
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
    deskripsi: string
    absen: 'Manual' | 'Otomatis' | 'GPS' | 'GPS dan Swafoto' | null
    waktu_tersedia: string
    waktu_akhir_absen: string | null
    batas_waktu: string | null
    id_bank_soal: string
    acak_soal: 0 | 1
    acak_jawaban: 0 | 1
    waktu_mulai_ujian: string
    waktu_selesai_ujian: string
    durasi_ujian: number
    created_at: string
    updated_at: string
  }
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
    created_at: string
    updated_at: string
  }
}

export const dataUjianAction = async (idKelas: string, id: string) =>
  makeJwtGetRequestAction<DataType>(
    `${process.env.API_URL}/peserta/kelas/${idKelas}/aktifitas/${id}/sesi-ujian`
  )
