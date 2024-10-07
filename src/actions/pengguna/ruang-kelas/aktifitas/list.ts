'use server'

import { makeJwtGetRequestTableAction } from '@/utils/action'

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
    waktu_tersedia: string
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
  file_aktifitas: {
    id: string
    id_parent: string | null
    nama: string
    deskripsi: string
    content: string
    ekstensi: string
    tipe: 'Dokumen' | 'Audio' | 'Video' | 'Gambar' | 'Folder' | 'Teks' | null
    url: string
    ukuran: number
    id_pengguna: string
    id_instansi: string | null
    created_at: string
    updated_at: string
  }[]
}

export const listAktifitasAction = async ({
  page = 1,
  params,
}: {
  page?: number
  params: {
    idKelas: string
  }
}) =>
  makeJwtGetRequestTableAction<DataType>(
    `${process.env.API_URL}/kelas/${params.idKelas}/aktifitas`,
    {
      current_page: page,
      per_page: 10,
    }
  )
