'use server'

import { UbahBerkasFormSchema } from '@/components/page/pengguna/pustaka-media/modal/ubah-berkas'
import { makeJwtPutRequestAction } from '@/utils/action'

export const ubahBerkasAction = (id: string, data: UbahBerkasFormSchema) =>
  makeJwtPutRequestAction(`${process.env.API_URL}/pustaka-media/berkas/${id}`, {
    nama: data.nama,
  })
