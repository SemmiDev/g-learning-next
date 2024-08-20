'use server'

import { makeJwtGetRequestAction } from '@/utils/action'

export const cekKelengkapanProfil = () =>
  makeJwtGetRequestAction(`${process.env.API_URL}/pengguna`)
