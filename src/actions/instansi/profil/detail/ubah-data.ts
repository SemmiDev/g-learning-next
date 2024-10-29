'use server'

import { UbahProfilFormSchema } from '@/components/page/instansi/profil/detail/modal/ubah'
import { makeJwtPutRequestAction } from '@/utils/action'

export const ubahProfilAction = async (data: UbahProfilFormSchema) =>
  makeJwtPutRequestAction(`${process.env.API_URL}/instansi/profil-instansi`, {
    nama_instansi: data.nama,
    telepon_instansi: data.kontak,
    nama_pimpinan: data.pimpinan,
    telepon_pimpinan: data.kontakPimpinan,
    alamat: data.alamat,
    bio: data.bio,
  })
