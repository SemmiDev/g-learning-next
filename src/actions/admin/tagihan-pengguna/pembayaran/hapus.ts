'use server'

import { makeJwtDeleteRequestAction } from '@/utils/action'

export const hapusPembayaranTagihanPenggunaAction = async (
  idTagihan: string,
  id: string
) =>
  makeJwtDeleteRequestAction(
    `${process.env.API_URL}/admin/tagihan-pengguna/${idTagihan}/pembayaran/${id}`
  )
