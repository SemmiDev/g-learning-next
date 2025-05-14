import { ShareTugasFormSchema } from '@/components/pages/pengguna/bank-materi/kategori/modal/share-tugas'
import { MateriItemType } from '@/components/ui'
import { makeJwtPostRequestApi } from '@/utils/api'
import { cleanQuill } from '@/utils/string'

export const shareTugasBankMateriApi = async (
  jwt: string,
  idKelas: string,
  materi: MateriItemType,
  data: ShareTugasFormSchema
) =>
  makeJwtPostRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/kelas/${idKelas}/aktifitas`,
    jwt,
    {
      judul: materi.name,
      deskripsi: cleanQuill(materi.desc),
      berkas: materi.fileIds,
      tipe: 'Penugasan',
      batas_waktu: data.batasWaktu,
    }
  )
