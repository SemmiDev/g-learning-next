'use server'

import { makeJwtGetRequestAction } from '@/utils/action'

export type DataType = {
  id: string
  id_kelas: string
  id_peserta: string
  status: string
  created_at: string
  updated_at: string
  nama: string
  email: string
  username: string
  foto: string
}

export const lihatPesertaKelasAction = async (
  idKelas: string,
  idPeserta: string
) =>
  makeJwtGetRequestAction<DataType>(
    `${process.env.API_URL}/pengajar/kelas/${idKelas}/peserta-kelas/${idPeserta}`
  )
