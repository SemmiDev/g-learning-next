import { UbahSemesterAktifFormSchema } from '@/components/pages/instansi/profil/modal/ubah-semester-aktif'
import { makeJwtPutRequestApi } from '@/utils/api'

export const ubahSemesterAktifApi = async (
  jwt: string,
  data: UbahSemesterAktifFormSchema
) =>
  makeJwtPutRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/instansi/profil-instansi`,
    jwt,
    {
      semester_aktif: data.semester?.value,
    }
  )
