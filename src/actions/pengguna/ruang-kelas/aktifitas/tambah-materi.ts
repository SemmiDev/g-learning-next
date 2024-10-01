'use server'

import { TambahMateriFormSchema } from '@/components/page/pengguna/ruang-kelas/kelas/diskusi/modal/tambah-materi'
import { makeJwtPostRequestAction } from '@/utils/action'
import { mustBe } from '@/utils/must-be'
import { cleanQuill } from '@/utils/string'

export const tambahAktifitasMateriAction = (
  idKelas: string,
  data: TambahMateriFormSchema
) =>
  makeJwtPostRequestAction(
    `${process.env.API_URL}/kelas/${idKelas}/aktifitas`,
    {
      judul: data.judul,
      deskripsi: cleanQuill(data.catatan),
      tipe: 'Materi',
      tipe_presensi:
        data.presensi === 'aktif'
          ? mustBe(data.tipe_presensi, ['Manual', 'Otomatis'], 'Manual')
          : undefined,
      waktu_akhir_absen: undefined,
      jadwal: data.jadwal,
      berkas: (data.berkas ?? []).map((item) => item.id),
    }
  )
