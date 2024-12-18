'use server'

import { TambahFolderFormSchema } from '@/components/page/pengguna/pustaka-media/modal/tambah-folder'
import { makeJwtPostRequestAction } from '@/utils/action'

export const tambahFolderAction = async (
  data: TambahFolderFormSchema,
  googleDrive?: boolean,
  idInstansi?: string,
  idFolder?: string
) =>
  makeJwtPostRequestAction(`${process.env.API_URL}/pustaka-media/folder`, {
    nama: data.nama,
    deskripsi: data.deskripsi,
    google_drive: googleDrive ? true : undefined,
    id_instansi: !idFolder ? idInstansi : undefined,
    id_parent: idFolder ?? null,
  })
