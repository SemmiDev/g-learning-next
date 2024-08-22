'use server'

import { makeJwtGetRequestAction } from '@/utils/action'

export const lihatAdminAction = (id: string) =>
  makeJwtGetRequestAction(`${process.env.API_URL}/admin/akun/${id}`)
