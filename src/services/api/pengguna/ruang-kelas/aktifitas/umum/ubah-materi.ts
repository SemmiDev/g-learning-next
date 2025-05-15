import { UbahMateriFormSchema } from '@/components/pages/pengguna/ruang-kelas/umum/kelas/diskusi/modal/ubah-materi'
import { makeJwtPutRequestApi } from '@/utils/api'
import { mustBe } from '@/utils/must-be'
import { cleanQuill } from '@/utils/string'

export const ubahAktifitasMateriApi = async (
  jwt: string,
  idKelas: string,
  id: string,
  data: UbahMateriFormSchema
) =>
  makeJwtPutRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/kelas/${idKelas}/aktifitas/${id}`,
    jwt,
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
