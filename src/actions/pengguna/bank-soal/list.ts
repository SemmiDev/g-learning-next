'use server'

import { ControlledAsyncTableActionProps } from '@/components/ui/controlled-async-table'
import { makeJwtGetRequestTableAction } from '@/utils/action'

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
  created_at: string
  update_at: string
}

export const listBankSoalAction = async ({
  page = 1,
  search = '',
  params,
}: ControlledAsyncTableActionProps = {}) =>
  makeJwtGetRequestTableAction<DataType>(
    `${process.env.API_URL}/kategori-bank-soal/${params?.idKategori}/bank-soal`,
    {
      current_page: page,
      keyword: search,
      per_page: 20,
    }
  )
