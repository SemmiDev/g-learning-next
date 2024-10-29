'use server'

import { DeleteActionType, makeJwtDeleteRequestAction } from '@/utils/action'

export const hapusPaketPenggunaAction = async (id: string) =>
  makeJwtDeleteRequestAction(`${process.env.API_URL}/paket-pengguna/${id}`)
