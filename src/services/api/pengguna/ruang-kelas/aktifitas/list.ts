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
    absen: 'Manual' | 'Otomatis' | 'GPS' | 'GPS dan Swafoto' | 'QR Code' | null
    waktu_tersedia: string | null
    waktu_akhir_absen: string | null
    batas_waktu: string | null
    id_bank_soal: string | null
    acak_soal_ujian: 0 | 1 | null
    acak_jawaban: 0 | 1 | null
    waktu_mulai_ujian: string | null
    waktu_selesai_ujian: string | null
    durasi_ujian: string | null
    created_at: string
    updated_at: string
  } | null
  pembuat: {
    username: string
    nama: string
    foto: string
  } | null
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
    total_soal: number
    total_soal_essay: number
    total_soal_pilihan_ganda: number
  } | null
  file_aktifitas:
    | {
        id: string
        id_parent: string | null
        nama: string
        deskripsi: string
        content: string
        ekstensi: string
        tipe:
          | 'Dokumen'
          | 'Audio'
          | 'Video'
          | 'Gambar'
          | 'Folder'
          | 'Teks'
          | null
        url: string
        ukuran: number
        id_pengguna: string
        id_instansi: string | null
        created_at: string
        updated_at: string
      }[]
    | null
  tipe: 'aktifitas' | 'pertemuan kelas'
  pertemuan_kelas: {
    id: string
    id_kelas: string
    judul: string
    pertemuan: number
    hari:
      | 'Senin'
      | 'Selasa'
      | 'Rabu'
      | 'Kamis'
      | 'Jumat'
      | 'Sabtu'
      | 'Minggu'
      | null
    waktu_mulai: string
    waktu_sampai: string
    tanggal_realisasi: string | null
    status: 'Sedang Berlangsung' | 'Belum Dibuka' | 'Telah Berakhir'
    jenis_absensi_pengajar: 'GPS' | 'Swafoto' | 'GPS dan Swafoto' | 'QR Code'
    jenis_absensi_peserta:
      | 'Manual'
      | 'Otomatis'
      | 'GPS'
      | 'Swafoto'
      | 'GPS dan Swafoto'
      | 'QR Code'
    status_absensi_pengajar: 'Hadir' | 'Izin' | 'Sakit' | 'Alpha'
    latitude: number | null
    longitude: number | null
    swafoto: string | null
    created_at: string
    updated_at: string
    swafoto_url: string | null
    lokasi_pertemuan: string
    total_bahan_ajar: number
  } | null
}

export const listAktifitasAction = async ({
  page = 1,
  idKelas,
  idSesi,
  tipe,
  tanpaSesi,
  order,
}: {
  page?: number
  idKelas: string
  idSesi?: string
  tipe?: 'aktifitas' | 'pertemuan kelas'
  tanpaSesi?: boolean
  order?: 'ASC' | 'DESC'
}) =>
  makeJwtGetRequestTableAction<DataType>(
    `${process.env.NEXT_PUBLIC_API_URL}/kelas/${idKelas}/aktifitas`,
    {
      id_pertemuan_kelas: idSesi,
      tipe,
      aktifitas_tanpa_sesi:
        tanpaSesi !== undefined ? (tanpaSesi ? 'true' : 'false') : undefined,
      current_page: page,
      per_page: 10,
      order,
    }
  )
