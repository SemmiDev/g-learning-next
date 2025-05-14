import { UbahBerkasFormSchema } from '@/components/pages/pengguna/pustaka-media/modal/ubah-berkas'
import { makeJwtPutRequestApi } from '@/utils/api'

export const ubahBerkasApi = async (
  jwt: string,
  id: string,
  data: UbahBerkasFormSchema
) =>
  makeJwtPutRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/pustaka-media/berkas/${id}`,
    jwt,
    {
      nama: data.nama,
    }
  )
