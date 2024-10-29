'use server'

import { makeJwtGetRequestAction } from '@/utils/action'

export type DataType = {
  id?: string | null
  id_aktifitas?: string
  id_peserta?: string
  nama?: string
  foto?: string
  nilai?: number | null
  catatan_pengajar?: string
  catatan_peserta?: string
  status_pengumpulan?: boolean
  waktu_pengumpulan?: string | null
  berkas?: {
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

export const lihatNilaiTugasAction = async (
  idKelas: string,
  idAktifitas: string,
  idPeserta: string
) =>
  makeJwtGetRequestAction<DataType>(
    `${process.env.API_URL}/pengajar/kelas/${idKelas}/aktifitas/${idAktifitas}/penilaian-tugas/${idPeserta}`
  )
