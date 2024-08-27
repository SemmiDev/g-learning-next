'use server'

import { makeJwtGetRequestAction } from '@/utils/action'

export const lihatPaketPenggunaAction = (id: string) =>
  makeJwtGetRequestAction(`${process.env.API_URL}/paket-pengguna/${id}`)
