import { makeJwtDeleteRequestApi } from '@/utils/api'

export const hapusPembayaranTagihanPenggunaApi = async (
  jwt: string,
  idTagihan: string,
  id: string
) =>
  makeJwtDeleteRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/tagihan-pengguna/${idTagihan}/pembayaran/${id}`,
    jwt
  )
