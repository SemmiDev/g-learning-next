import { ControlledAsyncTableApiProps } from '@/components/ui/controlled-async-table'
import { makeJwtGetRequestTableApi } from '@/utils/api'

export type DataType = {
  id: string
  id_kelas: string
  id_pertemuan_kelas: string
  id_peserta: string
  status: string | null
  latitude: number | null
  longitude: number | null
  swafoto: string | null
  created_at: string
  updated_at: string
  username: string
  nama: string
  email: string
  swafoto_url: string | null
  foto: string
  kode_unik_qr: string | null
  waktu_qr: string | null
}

export const tablePresensiPesertaSesiApi = async ({
  jwt,
  page = 1,
  search = '',
  sort,
  perPage,
  params,
}: ControlledAsyncTableApiProps) =>
  makeJwtGetRequestTableApi<DataType>(
    `${process.env.NEXT_PUBLIC_API_URL}/kelas-akademik/${params?.idKelas}/pertemuan/${params?.idSesi}/absensi-peserta`,
    jwt,
    {
      current_page: page,
      keyword: search,
      sort_by: sort?.name,
      order: sort?.order,
      per_page: perPage,
    }
  )
