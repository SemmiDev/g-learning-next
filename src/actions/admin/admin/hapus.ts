'use server'

import { makeJwtDeleteRequestAction } from '@/utils/action'

export const hapusAdminAction = async (id: string) =>
  makeJwtDeleteRequestAction(`${process.env.API_URL}/admin/akun/${id}`)
