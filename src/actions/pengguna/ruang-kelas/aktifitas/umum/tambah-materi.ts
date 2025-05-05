'use server'

import { TambahMateriFormSchema } from '@/components/page/pengguna/ruang-kelas/umum/kelas/diskusi/modal/tambah-materi'
import { makeJwtPostRequestAction } from '@/utils/action'
import { mustBe } from '@/utils/must-be'
import { cleanQuill } from '@/utils/string'

export const tambahAktifitasMateriAction = async (
  idKelas: string,
  data: TambahMateriFormSchema
) =>
  makeJwtPostRequestAction(
    `${process.env.API_URL}/kelas/${idKelas}/aktifitas`,
    {
      ...(data.share && data.materi
        ? {
            judul: data.materi.name,
            deskripsi: cleanQuill(data.materi.desc),
            berkas: data.materi.fileIds,
          }
        : {
            judul: data.judul,
            deskripsi: cleanQuill(data.catatan),
            berkas: (data.berkas ?? []).map((item) => item.id),
          }),
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
