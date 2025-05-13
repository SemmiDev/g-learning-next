import { UbahSemesterAktifFormSchema } from '@/components/pages/instansi/profil/modal/ubah-semester-aktif'
import { makeJwtPutRequestAction } from '@/utils/action'

export const ubahSemesterAktifAction = async (
  data: UbahSemesterAktifFormSchema
) =>
  makeJwtPutRequestAction(
    `${process.env.NEXT_PUBLIC_API_URL}/instansi/profil-instansi`,
    {
      semester_aktif: data.semester?.value,
    }
  )
