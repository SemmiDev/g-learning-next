import { UbahAdminProdiFormSchema } from '@/components/pages/instansi/profil/manajemen-prodi/modal/ubah'
import { makeJwtPutRequestApi } from '@/utils/api'

export const ubahAdminProdiApi = async (
  jwt: string,
  id: string,
  data: UbahAdminProdiFormSchema
) =>
  makeJwtPutRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/instansi/akun-prodi/${id}`,
    jwt,
    {
      username: data.username,
      id_sms: data.prodi?.value,
      nama: data.nama,
      kata_sandi: data.password || undefined,
      ulangi_kata_sandi: data.ulangiPassword || undefined,
    }
  )
