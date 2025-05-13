import { UbahProfilFormSchema } from '@/components/pages/pengguna/profil/modal/ubah'
import { makeJwtPutRequestAction } from '@/utils/action'
import { cleanQuill } from '@/utils/string'

export const ubahProfilAction = async (data: UbahProfilFormSchema) =>
  makeJwtPutRequestAction(`${process.env.NEXT_PUBLIC_API_URL}/pengguna`, {
    nama: data.nama,
    nik: data.nik,
    jenis_kelamin: data.jenisKelamin,
    hp: data.kontak ?? '',
    situs_web: data.website ?? '',
    bio: cleanQuill(data.bio) ?? '',
  })
