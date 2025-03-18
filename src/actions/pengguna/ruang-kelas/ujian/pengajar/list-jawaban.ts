'use server'

import { makeJwtGetRequestAction } from '@/utils/action'

export type DataType = {
  id_soal: string
  id_aktifitas: string
  id_bank_soal: string
  tipe: 'PILIHAN_GANDA' | 'ESSAY'
  soal: string
  jawaban_a: string
  jawaban_b: string
  jawaban_c: string
  jawaban_d: string
  jawaban_e: string
  jawaban_benar: string
  nilai: number | null
  bobot_essay: number | null
  jawaban_anda: string
  created_at: string
  updated_at: string
}

export const listJawabanUjianAction = async (
  idKelas: string,
  idAktifitas: string,
  idPeserta: string
) =>
  makeJwtGetRequestAction<DataType[]>(
    `${process.env.API_URL}/pengajar/kelas/${idKelas}/aktifitas/${idAktifitas}/jawaban/${idPeserta}`
  )
