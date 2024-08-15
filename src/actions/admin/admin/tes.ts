'use server'

import { makeJwtGetRequestAction } from '@/utils/action'

export const tesAction = () =>
  makeJwtGetRequestAction(`${process.env.API_URL}/admin/paket-instansi`, {
    per_page: 10,
    keyword: 'paket 1',
  })
