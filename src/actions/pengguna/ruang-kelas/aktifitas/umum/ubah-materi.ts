'use server'

import { UbahMateriFormSchema } from '@/components/page/pengguna/ruang-kelas/umum/kelas/diskusi/modal/ubah-materi'
import { makeJwtPutRequestAction } from '@/utils/action'
import { mustBe } from '@/utils/must-be'
import { cleanQuill } from '@/utils/string'

export const ubahAktifitasMateriAction = async (
  idKelas: string,
  id: string,
  data: UbahMateriFormSchema
) =>
  makeJwtPutRequestAction(
    `${process.env.API_URL}/kelas/${idKelas}/aktifitas/${id}`,
    {
      judul: data.judul,
      deskripsi: cleanQuill(data.catatan),
      berkas: (data.berkas ?? []).map((item) => item.id),
      tipe: 'Materi',
      tipe_presensi:
        data.presensi === 'aktif'
          ? mustBe(
              data.tipe_presensi,
              ['Manual', 'Otomatis', 'GPS', 'GPS dan Swafoto', 'QR Code'],
              'Manual'
            )
          : '',
      waktu_akhir_absen: undefined,
      jadwal: data.jadwal ?? '',
    }
  )
