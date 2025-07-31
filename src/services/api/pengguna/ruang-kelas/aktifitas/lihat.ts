import { makeJwtGetRequestApi } from '@/utils/api'

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
    absen: 'Manual' | 'Otomatis' | 'GPS' | 'GPS dan Swafoto' | 'QR Code' | null
    waktu_tersedia: string | null
    waktu_akhir_absen: string | null
    batas_waktu: string | null
    id_bank_soal: string | null
    acak_soal: 0 | 1 | null
    acak_jawaban: 0 | 1 | null
    waktu_mulai_ujian: string | null
    waktu_selesai_ujian: string | null
    durasi_ujian: number | null
    id_pertemuan_kelas: string
    created_at: string
    updated_at: string
  }
  bank_soal?: {
    id: string
    id_kategori: string
    id_pengajar: string
    judul: string
    deskripsi: string
    bobot_benar: number
    bobot_salah: number
    bobot_kosong: number
    jumlah_soal_yang_digunakan: number
    total_soal: number
    total_soal_essay: number
    total_soal_pilihan_ganda: number
    persentase_essay: number
    persentase_pilihan_ganda: number
    created_at: string
    updated_at: string
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
  total_komentar: number
  link_conference?: string
  tipe_konferensi?: 'Manual' | 'Otomatis'
  pembuat: {
    id: string
    email: string
    username: string
    nama: string
    foto: string
  }
  absensi: {
    id: string
    id_kelas: string
    id_aktifitas: string
    id_peserta: string
    status: 'Hadir' | 'Izin' | 'Sakit' | 'Alpha' | ''
    created_at: string
    updated_at: string
    latitude: number | null
    longitude: number | null
    swafoto: string | null
    url_swafoto: string
  } | null
}

export const lihatAktifitasApi = async (
  jwt: string,
  idKelas: string,
  id: string
) =>
  makeJwtGetRequestApi<DataType>(
    `${process.env.NEXT_PUBLIC_API_URL}/kelas/${idKelas}/aktifitas/${id}`,
    jwt
  )
