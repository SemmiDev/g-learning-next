import { PengaturanSesiFormSchema } from '@/components/pages/instansi/pengaturan/sesi-tab'
import { ActionResponseType } from '@/utils/action'
import { makeJwtPutRequestApi } from '@/utils/api'

export const ubahPengaturanSesiApi = async (
  jwt: string,
  data: PengaturanSesiFormSchema
): Promise<ActionResponseType> =>
  makeJwtPutRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/instansi/pengaturan`,
    jwt,
    {
      pengaturan_tambah_pertemuan: data.aksesTambah,
      pengaturan_edit_pertemuan: data.aksesUbah,
      pengaturan_hapus_pertemuan: data.aksesHapus,
    }
  )
