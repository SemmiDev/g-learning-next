'use server'

import { ShareMateriFormSchema } from '@/components/page/pengguna/bank-materi/kategori/modal/share-materi'
import { MateriItemType } from '@/components/ui'
import { makeJwtPostRequestAction } from '@/utils/action'
import { mustBe } from '@/utils/must-be'
import { cleanQuill } from '@/utils/string'

export const shareMateriBankMateriAction = (
  idKelas: string,
  materi: MateriItemType,
  data: ShareMateriFormSchema
) =>
  makeJwtPostRequestAction(
    `${process.env.API_URL}/kelas/${idKelas}/aktifitas`,
    {
      judul: materi.name,
      deskripsi: cleanQuill(materi.desc),
      berkas: materi.fileIds,
      tipe: 'Materi',
      tipe_presensi:
        data.presensi === 'aktif'
          ? mustBe(data.tipe_presensi, ['Manual', 'Otomatis'], 'Manual')
          : null,
      waktu_akhir_absen: undefined,
      jadwal: data.jadwal,
    }
  )
