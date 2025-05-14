import { ControlledAsyncTableApiProps } from '@/components/ui/controlled-async-table'
import { makeJwtGetRequestTableApi } from '@/utils/api'

export type DataType = {
  id: string
  id_kategori: string
  id_pengajar: string
  judul: string
  deskripsi: string
  jumlah_soal_yang_digunakan: number
  bobot_benar: number
  bobot_salah: number
  bobot_kosong: number
  total_soal: number
  total_soal_essay: number
  total_soal_pilihan_ganda: number
  total_aktifitas: number
  persentase_essay: number
  persentase_pilihan_ganda: number
  created_at: string
  update_at: string
}

export const listPaketSoalApi = async ({
  jwt,
  page = 1,
  search = '',
  params,
}: ControlledAsyncTableApiProps) =>
  makeJwtGetRequestTableApi<DataType>(
    `${process.env.NEXT_PUBLIC_API_URL}/kategori-bank-soal/${params?.idKategori}/bank-soal`,
    jwt,
    {
      current_page: page,
      keyword: search,
      per_page: 20,
    }
  )
