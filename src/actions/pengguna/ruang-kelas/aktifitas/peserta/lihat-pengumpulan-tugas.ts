'use server'

import { makeJwtGetRequestAction } from '@/utils/action'

export type DataType = {
  id: string | null
  id_aktifitas: string
  id_peserta: string
  nama: string
  foto: string
  nilai: number | null
  catatan_pengajar: string
  catatan_peserta: string
  status_pengumpulan: boolean
  waktu_pengumpulan: string | null
  daftar_berkas_pengumpulan_tugas: {
    berkas_pengumpulan_tugas: {
      id: string
      id_pengumpulan_tugas: string
      link: string | null
      id_berkas: string
      created_at: string
      updated_at: string
    }
    berkas: {
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
    }
  }[]
}

export const lihatPengumpulanTugasAction = (
  idKelas: string,
  idAktifitas: string,
  idPeserta: string
) =>
  makeJwtGetRequestAction<DataType>(
    `${process.env.API_URL}/peserta/kelas/${idKelas}/aktifitas/${idAktifitas}/penilaian-tugas/${idPeserta}`
  )
