'use server'

import { ShareTugasFormSchema } from '@/components/page/pengguna/bank-materi/kategori/modal/share-tugas'
import { MateriItemType } from '@/components/ui'
import { makeJwtPostRequestAction } from '@/utils/action'
import { cleanQuill } from '@/utils/string'

export const shareTugasBankMateriAction = (
  idKelas: string,
  materi: MateriItemType,
  data: ShareTugasFormSchema
) =>
  makeJwtPostRequestAction(
    `${process.env.API_URL}/kelas/${idKelas}/aktifitas`,
    {
      judul: materi.name,
      deskripsi: cleanQuill(materi.desc),
      berkas: materi.fileIds,
      tipe: 'Penugasan',
      batas_waktu: data.batasWaktu,
    }
  )
