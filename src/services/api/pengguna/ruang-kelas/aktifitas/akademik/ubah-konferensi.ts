import { UbahKonferensiFormSchema } from '@/components/pages/pengguna/ruang-kelas/akademik/kelas/linimasa/modal/ubah-konferensi'
import { makeJwtPutRequestApi } from '@/utils/api'
import { cleanQuill } from '@/utils/string'

export const ubahAktifitasKonferensiApi = async (
  jwt: string,
  idKelas: string,
  id: string,
  data: UbahKonferensiFormSchema
) =>
  makeJwtPutRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/kelas/${idKelas}/aktifitas/${id}`,
    jwt,
    {
      judul: data.judul,
      deskripsi: cleanQuill(data.catatan) ?? '',
      jadwal: data.jadwal ?? '',
      link: data.link,
    }
  )
