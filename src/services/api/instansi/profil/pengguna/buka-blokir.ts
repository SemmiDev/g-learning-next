import { makeJwtPostRequestAction } from '@/utils/action'

export const bukaBlokirPenggunaAction = async (id: string) =>
  makeJwtPostRequestAction(
    `${process.env.NEXT_PUBLIC_API_URL}/instansi/buka-blokir-pengguna/${id}`
  )
