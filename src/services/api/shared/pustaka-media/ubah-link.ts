import { UbahLinkFormSchema } from '@/components/pages/pengguna/pustaka-media/modal/ubah-link'
import { makeJwtPutRequestApi } from '@/utils/api'

export const ubahLinkApi = async (
  jwt: string,
  id: string,
  data: UbahLinkFormSchema
) =>
  makeJwtPutRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/pustaka-media/berkas/${id}`,
    jwt,
    {
      nama: data.nama,
      link: !data.googleDrive ? data.link : undefined,
      tipe: !data.googleDrive ? data.tipe?.value ?? undefined : undefined,
    }
  )
