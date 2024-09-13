'use server'

import { makeJwtGetRequestAction } from '@/utils/action'

export type DataType = {
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
}

export const lihatBerkasAction = (id: string) =>
  makeJwtGetRequestAction<DataType>(
    `${process.env.API_URL}/pustaka-media/${id}`
  )
