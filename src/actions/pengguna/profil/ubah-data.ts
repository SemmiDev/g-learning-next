'use server'

import { UbahProfileFormSchema } from '@/components/page/pengguna/profil/modal/ubah'
import { makeJwtPutRequestAction } from '@/utils/action'
import { cleanQuill } from '@/utils/string'

export const ubahProfileAction = (data: UbahProfileFormSchema) =>
  makeJwtPutRequestAction(`${process.env.API_URL}/pengguna`, {
    nama: data.nama,
    nik: data.nik,
    jenis_kelamin: data.jenisKelamin,
    hp: data.kontak ?? null,
    situs_web: data.website ?? null,
    bio: cleanQuill(data.bio) ?? null,
  })
