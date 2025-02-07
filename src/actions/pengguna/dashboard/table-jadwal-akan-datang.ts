'use server'

import { makeJwtGetRequestAction } from '@/utils/action'

type DataType = {
  id_kelas: string
  nama_kelas: string
  tipe: 'Akademik' | 'Publik' | 'Privat'
  peran: 'Pengajar' | 'Peserta'
  thumbnail: string
  nama_instansi: string
  tanggal_mulai: string
  tanggal_sampai: string
}

export const tableJadwalAkanDatangAction = async () =>
  makeJwtGetRequestAction<DataType[]>(
    `${process.env.API_URL}/dashboard/jadwal-kelas-mendatang`
  )
