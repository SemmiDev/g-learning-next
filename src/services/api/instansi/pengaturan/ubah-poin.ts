import { PengaturanPoinTabFormSchema } from '@/components/pages/instansi/pengaturan/poin-tab'
import { makeJwtPutRequestApi } from '@/utils/api'

export const ubahPengaturanPoinApi = async (
  jwt: string,
  data: PengaturanPoinTabFormSchema
) =>
  makeJwtPutRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/instansi/pengaturan-poin`,
    jwt,
    {
      poin_uts: data.uts,
      poin_uas: data.uas,
      poin_upload_bahan_ajar: data.uploadBahanAjar,
      poin_link_konferensi: data.linkKonferensi,
      poin_informasi: data.informasi,
      poin_absensi: data.presensi,
    }
  )
