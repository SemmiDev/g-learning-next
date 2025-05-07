'use server'

import { makeJwtGetRequestAction } from '@/utils/action'

export type DataType = {
  id: string
  id_instansi: null
  id_pengajar: string
  nama_kelas: string
  sub_judul: string
  status: string
  deskripsi: string
  tipe: 'Akademik' | 'Publik' | 'Privat'
  kode_unik: string
  thumbnail: string
  total_pertemuan: number | null
  total_peserta: number
  nama_pemilik: string
  status_gabung: 'Pengajuan' | 'Diterima' | null
  created_at: string
  updated_at: string
}

export const lihatUndanganKelasAction = async (kode: string) =>
  makeJwtGetRequestAction<DataType>(
    `${process.env.API_URL}/kelas-publik?kode_unik=${kode}`
  )
