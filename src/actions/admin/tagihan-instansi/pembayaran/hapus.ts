'use server'

import { makeJwtDeleteRequestAction } from '@/utils/action'

export const hapusPembayaranTagihanInstansiAction = async (
  idTagihan: string,
  id: string
) =>
  makeJwtDeleteRequestAction(
    `${process.env.API_URL}/admin/tagihan-instansi/${idTagihan}/pembayaran/${id}`
  )
