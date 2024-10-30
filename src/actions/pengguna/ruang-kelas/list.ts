'use server'

import { ControlledAsyncTableActionProps } from '@/components/ui/controlled-async-table'
import { makeJwtGetRequestTableAction } from '@/utils/action'

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
    tipe: 'Akademik' | 'Publik' | 'Privat'
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
  peran: 'Pengajar' | 'Peserta'
}

export const listKelasAction = async ({
  page = 1,
  search = '',
}: ControlledAsyncTableActionProps = {}) =>
  makeJwtGetRequestTableAction<DataType>(`${process.env.API_URL}/kelas`, {
    current_page: page,
    keyword: search,
    per_page: 20,
  })
