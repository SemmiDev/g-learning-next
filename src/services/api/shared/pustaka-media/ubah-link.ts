import { UbahLinkFormSchema } from '@/components/pages/pengguna/pustaka-media/modal/ubah-link'
import { makeJwtPutRequestAction } from '@/utils/action'

export const ubahLinkAction = async (id: string, data: UbahLinkFormSchema) =>
  makeJwtPutRequestAction(
    `${process.env.NEXT_PUBLIC_API_URL}/pustaka-media/berkas/${id}`,
    {
      nama: data.nama,
      link: !data.googleDrive ? data.link : undefined,
      tipe: !data.googleDrive ? data.tipe?.value ?? undefined : undefined,
    }
  )
