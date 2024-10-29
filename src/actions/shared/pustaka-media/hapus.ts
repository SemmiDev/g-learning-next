'use server'

import { makeJwtDeleteRequestAction } from '@/utils/action'

export const hapusBerkasAction = async (id: string) =>
  makeJwtDeleteRequestAction(`${process.env.API_URL}/pustaka-media`, {
    id: [id],
  })
