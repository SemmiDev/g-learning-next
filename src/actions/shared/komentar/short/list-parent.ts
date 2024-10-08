'use server'

import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import {
  makeActionResponse,
  makeJwtGetRequestTableAction,
  makeTableActionResponse,
} from '@/utils/action'
import { getServerSession } from 'next-auth'

export type DataType = {
  id: string
  id_parent: string | null
  id_pengguna: string
  nama: string
  foto: string
  diskusi: string
  jumlah_balasan: number
  balasan: []
}

export const listKomentarShortParentAction = async ({
  page = 1,
  perPage = 2,
  idKelas,
  idAktifitas,
}: {
  page?: number
  perPage?: number
  idKelas: string
  idAktifitas: string
}) => {
  const { user } = (await getServerSession(authOptions)) ?? {}
  if (!user) return makeTableActionResponse<DataType>(makeActionResponse(false))

  return await makeJwtGetRequestTableAction<DataType>(
    `${process.env.API_URL}/kelas/${idKelas}/aktifitas/${idAktifitas}/diskusi`,
    {
      current_page: page,
      per_page: perPage,
    }
  )
}
