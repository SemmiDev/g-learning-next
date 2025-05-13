import { UbahProfilFormSchema } from '@/components/pages/pengguna/profil/modal/ubah'
import { makeJwtPutRequestApi } from '@/utils/api'
import { cleanQuill } from '@/utils/string'

export const ubahProfilApi = async (jwt: string, data: UbahProfilFormSchema) =>
  makeJwtPutRequestApi(`${process.env.NEXT_PUBLIC_API_URL}/pengguna`, jwt, {
    nama: data.nama,
    nik: data.nik,
    jenis_kelamin: data.jenisKelamin,
    hp: data.kontak ?? '',
    situs_web: data.website ?? '',
    bio: cleanQuill(data.bio) ?? '',
  })
