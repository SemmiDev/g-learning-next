'use server'

import { makeJwtGetRequestAction } from '@/utils/action'

export const cekKelengkapanProfilAction = () =>
  makeJwtGetRequestAction(`${process.env.API_URL}/pengguna`)
