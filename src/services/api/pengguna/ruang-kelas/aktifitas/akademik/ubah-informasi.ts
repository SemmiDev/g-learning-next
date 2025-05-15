import { UbahInformasiFormSchema } from '@/components/pages/pengguna/ruang-kelas/akademik/kelas/linimasa/modal/ubah-informasi'
import { makeJwtPutRequestApi } from '@/utils/api'
import { cleanQuill } from '@/utils/string'

export const ubahAktifitasInformasiApi = async (
  jwt: string,
  idKelas: string,
  id: string,
  data: UbahInformasiFormSchema
) =>
  makeJwtPutRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/kelas/${idKelas}/aktifitas/${id}`,
    jwt,
    {
      judul: data.judul,
      deskripsi: cleanQuill(data.catatan),
      jadwal: data.jadwal ?? '',
      berkas: (data.berkas ?? []).map((item) => item.id),
    }
  )
