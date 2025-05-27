import { makeJwtGetRequestTableApi } from '@/utils/api'

export type DataType = {
  id: string
  id_kelas: string
  id_peserta: string
  status: 'Pengajuan' | 'Dikeluarkan' | 'Diterima'
  peran: 'Pengajar' | 'Peserta'
  created_at: string
  updated_at: string
  nama: string
  email: string
  username: string
  foto: string
}

export const listPermintaanBergabungKelasApi = async ({
  jwt,
  page = 1,
  idKelas,
}: {
  jwt: string
  page?: number
  idKelas: string
}) =>
  makeJwtGetRequestTableApi<DataType>(
    `${process.env.NEXT_PUBLIC_API_URL}/pengajar/kelas/${idKelas}/peserta-kelas`,
    jwt,
    {
      current_page: page,
      per_page: 20,
      status: 'Pengajuan',
    }
  )
