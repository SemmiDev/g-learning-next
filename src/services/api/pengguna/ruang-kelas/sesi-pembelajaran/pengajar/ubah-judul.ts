import { UbahJudulSesiFormSchema } from '@/components/pages/pengguna/ruang-kelas/akademik/kelas/sesi-pembelajaran/pengajar/modal/ubah-judul'
import { makeJwtPutRequestAction } from '@/utils/action'

export const ubahJudulSesiAction = async (
  idKelas: string,
  id: string,
  data: UbahJudulSesiFormSchema
) =>
  makeJwtPutRequestAction(
    `${process.env.NEXT_PUBLIC_API_URL}/kelas-akademik/${idKelas}/pertemuan/${id}`,
    {
      judul: data.judul,
    }
  )
