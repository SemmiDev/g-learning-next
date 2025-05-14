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

export const listMateriApi = async ({
  jwt,
  page = 1,
  search = '',
  idKategori,
  tipe,
}: {
  jwt: string
  page?: number
  search?: string
  idKategori: string
  tipe?: 'Materi' | 'Penugasan'
}) =>
  makeJwtGetRequestTableApi<DataType>(
    `${process.env.NEXT_PUBLIC_API_URL}/kategori-bank-ajar/${idKategori}/bank-ajar`,
    jwt,
    {
      current_page: page,
      keyword: search,
      per_page: 20,
      tipe,
    }
  )
