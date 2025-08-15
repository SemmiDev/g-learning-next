import { UbahAdminProdiFormSchema } from '@/components/pages/instansi/profil/manajemen-prodi/modal/ubah'
import { makeJwtPutRequestApi } from '@/utils/api'
import { mustBe } from '@/utils/must-be'
import { switchCaseObject } from '@/utils/switch-case'

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
      tipe: mustBe(data.tipe, ['Fakultas', 'Prodi'], 'Prodi'),
      id_sms: switchCaseObject(
        data.tipe,
        { Fakultas: data.fakultas?.value, Prodi: data.prodi?.value },
        undefined
      ),
      nama: data.nama,
      kata_sandi: data.password || undefined,
      ulangi_kata_sandi: data.ulangiPassword || undefined,
    }
  )
