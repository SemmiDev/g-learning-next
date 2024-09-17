'use server'

import { UbahFileFormSchema } from '@/components/page/pengguna/pustaka-media/modal/ubah-file'
import { makeJwtPutRequestAction } from '@/utils/action'

export const ubahFileAction = (id: string, data: UbahFileFormSchema) =>
  makeJwtPutRequestAction(`${process.env.API_URL}/pustaka-media/berkas/${id}`, {
    nama: data.nama,
  })
