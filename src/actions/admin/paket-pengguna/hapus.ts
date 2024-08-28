'use server'

import { DeleteActionType, makeJwtDeleteRequestAction } from '@/utils/action'

export const hapusPaketPenggunaAction = (id: string) =>
  makeJwtDeleteRequestAction(`${process.env.API_URL}/paket-pengguna/${id}`)
