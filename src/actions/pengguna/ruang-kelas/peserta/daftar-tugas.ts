'use server'

import { makeJwtGetRequestTableAction } from '@/utils/action'

export type DataType = {
  id: string
  judul: string
  status: string
  deskripsi: string
  batas_waktu: string | null
}

export const daftarTugasPesertaAction = async ({
  page = 1,
  idKelas,
}: {
  page?: number
  idKelas: string
}) =>
  makeJwtGetRequestTableAction<DataType>(
    `${process.env.API_URL}/peserta/kelas/${idKelas}/daftar-tugas`,
    {
      current_page: page,
      per_page: 50,
    }
  )
