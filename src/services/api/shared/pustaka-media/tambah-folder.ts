import { TambahFolderFormSchema } from '@/components/pages/pengguna/pustaka-media/modal/tambah-folder'
import { makeJwtPostRequestApi } from '@/utils/api'

export const tambahFolderApi = async (
  jwt: string,
  data: TambahFolderFormSchema,
  googleDrive?: boolean,
  idInstansi?: string,
  idFolder?: string
) =>
  makeJwtPostRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/pustaka-media/folder`,
    jwt,
    {
      nama: data.nama,
      deskripsi: data.deskripsi,
      google_drive: googleDrive ? true : undefined,
      id_instansi: !idFolder ? idInstansi : undefined,
      id_parent: idFolder ?? null,
    }
  )
