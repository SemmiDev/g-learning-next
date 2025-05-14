import { ShareMateriFormSchema } from '@/components/pages/pengguna/bank-materi/kategori/modal/share-materi'
import { MateriItemType } from '@/components/ui'
import { makeJwtPostRequestApi } from '@/utils/api'
import { mustBe } from '@/utils/must-be'
import { cleanQuill } from '@/utils/string'

export const shareMateriBankMateriApi = async (
  jwt: string,
  idKelas: string,
  materi: MateriItemType,
  data: ShareMateriFormSchema
) =>
  makeJwtPostRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/kelas/${idKelas}/aktifitas`,
    jwt,
    {
      judul: materi.name,
      deskripsi: cleanQuill(materi.desc),
      berkas: materi.fileIds,
      tipe: 'Materi',
      tipe_presensi:
        data.presensi === 'aktif'
          ? mustBe(
              data.tipe_presensi,
              ['Manual', 'Otomatis', 'GPS', 'GPS dan Swafoto', 'QR Code'],
              'Manual'
            )
          : null,
      waktu_akhir_absen: undefined,
      jadwal: data.jadwal,
    }
  )
