'use server'

import { DataType } from '@/services/api/pengguna/ruang-kelas/sesi-pembelajaran/lihat'
import { makeJwtGetRequestAction } from '@/utils/action'

export const lihatSesiPembelajaranAction = async (
  idKelas: string,
  idSesi: string
) =>
  makeJwtGetRequestAction<DataType>(
    `${process.env.API_URL}/kelas-akademik/${idKelas}/pertemuan/${idSesi}`
  )
