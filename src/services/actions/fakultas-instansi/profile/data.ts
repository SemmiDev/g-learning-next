'use server'

import { DataType } from '@/services/api/admin/profil/data'
import { makeJwtGetRequestAction } from '@/utils/action'

export const dataProfilAction = async () =>
  makeJwtGetRequestAction<DataType>(`${process.env.API_URL}/pengguna`)
