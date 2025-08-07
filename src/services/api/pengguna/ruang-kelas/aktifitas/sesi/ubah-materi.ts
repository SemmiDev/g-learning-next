import { UbahMateriSesiFormSchema } from '@/components/pages/pengguna/ruang-kelas/akademik/kelas/sesi-pembelajaran/sesi/pengajar/modal/ubah-materi'
import { makeJwtPutRequestApi } from '@/utils/api'
import { cleanQuill } from '@/utils/string'

export const ubahAktifitasMateriSesiApi = async (
  jwt: string,
  idKelas: string,
  id: string,
  data: UbahMateriSesiFormSchema
) =>
  makeJwtPutRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/kelas/${idKelas}/aktifitas/${id}`,
    jwt,
    {
      judul: data.judul,
      deskripsi: cleanQuill(data.catatan) ?? '',
      berkas: (data.berkas ?? []).map((item) => item.id),
      tipe: 'Materi',
    }
  )
