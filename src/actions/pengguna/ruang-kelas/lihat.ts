'use server'

import { makeJwtGetRequestAction } from '@/utils/action'

export type DataType = {
  kelas: {
    id: string
    id_instansi: string | null
    id_pengajar: string
    nama_kelas: string
    sub_judul: string
    id_kelas_instansi: string
    id_kelas_semester: string
    status: string
    deskripsi: string
    tipe: 'Akademik' | 'Publik' | 'Privat'
    kode_unik: string
    thumbnail: string
    total_pertemuan: number | null
    nama_instansi: string
    verifikasi_instansi: boolean
    created_at: string
    updated_at: string
  }
  jadwal: {
    id: string
    id_kelas: string
    hari: string
    waktu_mulai: string
    waktu_sampai: string
    zona_waktu: string
    ruangan: string | null
    created_at: string
    updated_at: string
  }[]
  total_peserta: number
  nama_pemilik: string
  total_pertemuan_terlaksana: number
  peran: 'Pengajar' | 'Peserta'
}

export const lihatKelasAction = async (id: string) =>
  makeJwtGetRequestAction<DataType>(`${process.env.API_URL}/kelas/${id}`)
