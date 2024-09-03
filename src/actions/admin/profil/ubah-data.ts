'use server'

import { UbahProfilFormSchema } from '@/components/page/pengguna/profil/modal/ubah'
import { makeJwtPutRequestAction } from '@/utils/action'
import { cleanQuill } from '@/utils/string'

export const ubahProfilAction = (data: UbahProfilFormSchema) =>
  makeJwtPutRequestAction(`${process.env.API_URL}/pengguna`, {
    nama: data.nama,
    nik: data.nik,
    jenis_kelamin: data.jenisKelamin,
    hp: data.kontak ?? '',
    situs_web: data.website ?? '',
    bio: cleanQuill(data.bio) ?? '',
  })
