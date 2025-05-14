import { UbahProfilFormSchema } from '@/components/pages/instansi/profil/detail/modal/ubah'
import { makeJwtPutRequestApi } from '@/utils/api'

export const ubahProfilApi = async (jwt: string, data: UbahProfilFormSchema) =>
  makeJwtPutRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/instansi/profil-instansi`,
    jwt,
    {
      nama_instansi: data.nama,
      telepon_instansi: data.kontak,
      nama_pimpinan: data.pimpinan,
      telepon_pimpinan: data.kontakPimpinan,
      alamat: data.alamat,
      bio: data.bio,
    }
  )
