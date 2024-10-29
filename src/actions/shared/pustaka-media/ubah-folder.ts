'use server'

import { UbahFolderFormSchema } from '@/components/page/pengguna/pustaka-media/modal/ubah-folder'
import { makeJwtPutRequestAction } from '@/utils/action'

export const ubahFolderAction = async (
  id: string,
  data: UbahFolderFormSchema
) =>
  makeJwtPutRequestAction(`${process.env.API_URL}/pustaka-media/folder/${id}`, {
    nama: data.nama,
    deskripsi: data.deskripsi,
  })
