'use server'

import { UbahSemesterAktifFormSchema } from '@/components/page/instansi/profil/modal/ubah-semester-aktif'
import { makeJwtPutRequestAction } from '@/utils/action'

export const ubahSemesterAktifAction = async (
  data: UbahSemesterAktifFormSchema
) =>
  makeJwtPutRequestAction(`${process.env.API_URL}/instansi/profil-instansi`, {
    semester_aktif: data.semester?.value,
  })
