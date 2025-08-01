import { UbahKonferensiSesiFormSchema } from '@/components/pages/pengguna/ruang-kelas/akademik/kelas/sesi-pembelajaran/sesi/pengajar/modal/ubah-konferensi'
import { makeJwtPutRequestApi } from '@/utils/api'
import { cleanQuill } from '@/utils/string'

export const ubahAktifitasKonferensiSesiApi = async (
  jwt: string,
  idKelas: string,
  id: string,
  data: UbahKonferensiSesiFormSchema
) =>
  makeJwtPutRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/kelas/${idKelas}/aktifitas/${id}`,
    jwt,
    {
      judul: data.judul,
      deskripsi: cleanQuill(data.catatan) ?? '',
      link: data.link,
    }
  )
