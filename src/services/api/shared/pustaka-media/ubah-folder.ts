import { UbahFolderFormSchema } from '@/components/pages/pengguna/pustaka-media/modal/ubah-folder'
import { makeJwtPutRequestAction } from '@/utils/action'

export const ubahFolderAction = async (
  id: string,
  data: UbahFolderFormSchema
) =>
  makeJwtPutRequestAction(
    `${process.env.NEXT_PUBLIC_API_URL}/pustaka-media/folder/${id}`,
    {
      nama: data.nama,
      deskripsi: data.deskripsi,
    }
  )
