'use server'

import { DataType } from '@/services/api/pengguna/ruang-kelas/aktifitas/peserta/lihat-hasil-ujian'
import { makeJwtGetRequestAction } from '@/utils/action'

export const lihatHasilUjianAction = async (
  idKelas: string,
  idAktifitas: string
) =>
  makeJwtGetRequestAction<DataType>(
    `${process.env.API_URL}/peserta/kelas/${idKelas}/aktifitas/${idAktifitas}/penilaian-ujian`
  )
