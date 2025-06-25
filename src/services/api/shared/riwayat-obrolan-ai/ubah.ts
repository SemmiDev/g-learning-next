import { UbahRiwayatObrolanFormSchema } from '@/components/pages/pengguna/obrolan-ai/modal/ubah-obrolan'
import { makeJwtPutRequestApi } from '@/utils/api'

export const ubahRiwayatObrolanAiApi = async (
  jwt: string,
  id: string,
  data: UbahRiwayatObrolanFormSchema
) =>
  makeJwtPutRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/ai/chat/${id}`,
    jwt,
    {
      judul: data.judul,
    }
  )
