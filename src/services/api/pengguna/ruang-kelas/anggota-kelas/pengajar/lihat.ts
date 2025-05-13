import { makeJwtGetRequestAction } from '@/utils/action'

export type DataType = {
  id: string
  id_kelas: string
  id_peserta: string
  status: 'Pengajuan' | 'Dikeluarkan' | 'Diterima'
  created_at: string
  updated_at: string
  nama: string
  email: string
  username: string
  foto: string
}

export const lihatAnggotaKelasAction = async (
  idKelas: string,
  idPeserta: string
) =>
  makeJwtGetRequestAction<DataType>(
    `${process.env.NEXT_PUBLIC_API_URL}/pengajar/kelas/${idKelas}/peserta-kelas/${idPeserta}`
  )
