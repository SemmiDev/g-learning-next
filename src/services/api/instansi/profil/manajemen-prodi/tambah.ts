import { TambahAdminProdiFormSchema } from '@/components/pages/instansi/profil/manajemen-admin/modal/tambah'
import { makeJwtPostRequestApi } from '@/utils/api'
import { mustBe } from '@/utils/must-be'
import { switchCaseObject } from '@/utils/switch-case'

export const tambahAdminProdiApi = async (
  jwt: string,
  data: TambahAdminProdiFormSchema
) =>
  makeJwtPostRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/instansi/akun-prodi`,
    jwt,
    {
      username: data.username,
      tipe: mustBe(data.tipe, ['Fakultas', 'Prodi'], 'Prodi'),
      id_sms: switchCaseObject(
        data.tipe,
        { Fakultas: data.fakultas?.value, Prodi: data.prodi?.value },
        undefined
      ),
      nama: data.nama,
      kata_sandi: data.password,
      ulangi_kata_sandi: data.ulangiPassword,
    }
  )
