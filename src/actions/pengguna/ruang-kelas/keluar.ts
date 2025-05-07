'use server'

import { makeJwtPostRequestAction } from '@/utils/action'

export const keluarKelasAction = async (id: string) =>
  makeJwtPostRequestAction(`${process.env.API_URL}/kelas-publik/${id}/keluar`)
