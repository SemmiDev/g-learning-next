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
}

export const listKomentarShortParentAction = async ({
  page = 1,
  idKelas,
  idAktifitas,
  idParent,
}: {
  page?: number
  perPage?: number
  idKelas: string
  idAktifitas: string
  idParent: string
}) =>
  makeJwtGetRequestTableAction<DataType>(
    `${process.env.API_URL}/kelas/${idKelas}/aktifitas/${idAktifitas}/diskusi`,
    {
      current_page: page,
      per_page: 50,
      id_induk: idParent,
    }
  )
