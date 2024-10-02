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
    status: string
    deskripsi: string
    tipe: string
    kode_unik: string
    thumbnail: string
    nama_instansi: string
    verifikasi_instansi: boolean
  }
  jadwal: {
    id: string
    id_kelas: string
    hari: string
    waktu_mulai: string
    waktu_sampai: string
    zona_waktu: string
  }[]
  total_peserta: number
  nama_pemilik: string
  peran: string
}

export const lihatKelasAction = (id: string) =>
  makeJwtGetRequestAction<DataType>(`${process.env.API_URL}/kelas/${id}`)
