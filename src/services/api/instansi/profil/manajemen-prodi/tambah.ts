import { TambahAdminProdiFormSchema } from '@/components/pages/instansi/profil/manajemen-prodi/modal/tambah'
import { makeJwtPostRequestApi } from '@/utils/api'

export const tambahAdminProdiApi = async (
  jwt: string,
  data: TambahAdminProdiFormSchema
) =>
  makeJwtPostRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/instansi/akun-prodi`,
    jwt,
    {
      username: data.username,
      id_sms: data.prodi?.value,
      nama: data.nama,
      kata_sandi: data.password,
      ulangi_kata_sandi: data.ulangiPassword,
    }
  )
