import { UbahJudulSesiFormSchema } from '@/components/pages/pengguna/ruang-kelas/akademik/kelas/sesi-pembelajaran/pengajar/modal/ubah-judul'
import { makeJwtPutRequestApi } from '@/utils/api'

export const ubahJudulSesiApi = async (
  jwt: string,
  idKelas: string,
  id: string,
  data: UbahJudulSesiFormSchema
) =>
  makeJwtPutRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/kelas-akademik/${idKelas}/pertemuan/${id}`,
    jwt,
    {
      judul: data.judul,
    }
  )
