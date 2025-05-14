import { ControlledAsyncTableApiProps } from '@/components/ui/controlled-async-table'
import { makeJwtGetRequestTableApi } from '@/utils/api'

export type DataType = {
  bank_ajar: {
    id: string
    id_kategori: string
    tipe: string
    judul: string
    deskripsi: string
    created_at: string
    updated_at: string
  }
  daftar_file_bank_ajar: [
    {
      id: string
      id_parent: string | null
      nama: string
      deskripsi: string
      content: string
      ekstensi: string
      tipe: string
      url: string
      ukuran: number
      id_pengguna: string
      id_instansi: string | null
      created_at: string
      updated_at: string
    }
  ]
  total_file_bank_ajar: number
}

export const listBankMateriApi = async ({
  jwt,
  page = 1,
  search = '',
  params,
}: ControlledAsyncTableApiProps) =>
  makeJwtGetRequestTableApi<DataType>(
    `${process.env.NEXT_PUBLIC_API_URL}/kategori-bank-ajar/${params?.idKategori}/bank-ajar`,
    jwt,
    {
      current_page: page,
      keyword: search,
      per_page: 20,
    }
  )
