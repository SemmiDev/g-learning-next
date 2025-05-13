import { UbahBerkasFormSchema } from '@/components/pages/pengguna/pustaka-media/modal/ubah-berkas'
import { makeJwtPutRequestAction } from '@/utils/action'

export const ubahBerkasAction = async (
  id: string,
  data: UbahBerkasFormSchema
) =>
  makeJwtPutRequestAction(
    `${process.env.NEXT_PUBLIC_API_URL}/pustaka-media/berkas/${id}`,
    {
      nama: data.nama,
    }
  )
