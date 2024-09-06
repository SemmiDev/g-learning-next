'use server'

import { makeJwtDeleteRequestAction } from '@/utils/action'

export const hapusPembayaranInstansiAction = (id: string) =>
  makeJwtDeleteRequestAction(`${process.env.API_URL}/admin/pembayaran/${id}`)
