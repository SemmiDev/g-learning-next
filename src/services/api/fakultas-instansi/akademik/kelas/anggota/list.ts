import { ControlledAsyncTableApiProps } from '@/components/ui/controlled-async-table'
import { makeJwtGetRequestTableApi } from '@/utils/api'

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
  peran: 'Pengajar' | 'Peserta'
}

export const listAnggotaKelasApi = async ({
  jwt,
  page = 1,
  search = '',
  params,
}: ControlledAsyncTableApiProps) =>
  makeJwtGetRequestTableApi<DataType>(
    `${process.env.NEXT_PUBLIC_API_URL}/fakultas/kelas/${params?.idKelas}/peserta`,
    jwt,
    {
      current_page: page,
      keyword: search,
    }
  )
