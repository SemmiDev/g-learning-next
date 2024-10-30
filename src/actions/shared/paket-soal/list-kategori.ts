'use server'

import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import { ControlledAsyncTableActionProps } from '@/components/ui/controlled-async-table'
import {
  makeActionResponse,
  makeJwtGetRequestTableAction,
  makeTableActionResponse,
} from '@/utils/action'
import { getServerSession } from 'next-auth'

export type DataType = {
  id: string
  nama_kategori: string
  id_pengajar: string
  total_bank_soal: number
}

export const listKategoriSoalAction = async ({
  page = 1,
  search = '',
}: ControlledAsyncTableActionProps = {}) => {
  const { user } = (await getServerSession(authOptions)) ?? {}
  if (!user) return makeTableActionResponse<DataType>(makeActionResponse(false))

  return await makeJwtGetRequestTableAction<DataType>(
    `${process.env.API_URL}/kategori-bank-soal`,
    {
      current_page: page,
      keyword: search,
      per_page: 20,
    }
  )
}
