import { makeJwtDeleteRequestApi } from '@/utils/api'

export const hapusPembayaranTagihanInstansiApi = async (
  jwt: string,
  idTagihan: string,
  id: string
) =>
  makeJwtDeleteRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/tagihan-instansi/${idTagihan}/pembayaran/${id}`,
    jwt
  )
