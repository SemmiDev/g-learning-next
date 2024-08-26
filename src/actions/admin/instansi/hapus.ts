'use server'

import { makeJwtDeleteRequestAction } from '@/utils/action'

export const hapusInstansiAction = (id: string) =>
  makeJwtDeleteRequestAction(`${process.env.API_URL}/admin/instansi/${id}`)
