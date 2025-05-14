import { UbahFolderFormSchema } from '@/components/pages/pengguna/pustaka-media/modal/ubah-folder'
import { makeJwtPutRequestApi } from '@/utils/api'

export const ubahFolderApi = async (
  jwt: string,
  id: string,
  data: UbahFolderFormSchema
) =>
  makeJwtPutRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/pustaka-media/folder/${id}`,
    jwt,
    {
      nama: data.nama,
      deskripsi: data.deskripsi,
    }
  )
