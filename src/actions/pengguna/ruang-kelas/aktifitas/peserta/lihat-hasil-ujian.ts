'use server'

import { makeJwtGetRequestAction } from '@/utils/action'

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
    acak_soal: number | null
    acak_jawaban: number | null
    waktu_mulai_ujian: string | null
    waktu_selesai_ujian: string | null
    durasi_ujian: number | null
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
  jawaban: {
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
    status_pengumpulan: string | null
    selesai: number | null
    skor_benar: number | null
    skor_salah: number | null
    skor_kosong: number | null
    skor_akhir: number | null
    jawaban_benar: number | null
    jawaban_salah: number | null
    jawaban_kosong: number | null
    waktu_mulai: string | null
    waktu_selesai: string | null
    created_at: string | null
    updated_at: string | null
  }
}

export const lihatHasilUjianAction = async (
  idKelas: string,
  idAktifitas: string
) =>
  makeJwtGetRequestAction<DataType>(
    `${process.env.API_URL}/peserta/kelas/${idKelas}/aktifitas/${idAktifitas}/penilaian-ujian`
  )
