'use server'

import { TambahFolderFormSchema } from '@/components/page/pengguna/pustaka-media/modal/tambah-folder'
import { makeJwtPostRequestAction } from '@/utils/action'

export const tambahFolderAction = async (
  data: TambahFolderFormSchema,
  idInstansi?: string,
  idFolder?: string
) =>
  makeJwtPostRequestAction(`${process.env.API_URL}/pustaka-media/folder`, {
    nama: data.nama,
    deskripsi: data.deskripsi,
    id_instansi: !idFolder ? idInstansi : undefined,
    id_parent: idFolder ?? null,
  })
