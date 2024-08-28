'use server'

import { TambahPaketInstansiFormSchema } from '@/components/page/admin/paket-instansi/modal/tambah'
import { makeJwtPostRequestAction } from '@/utils/action'
import { FILE_SIZE_UNIT_SCALE, fileSizeToMB } from '@/utils/bytes'
import { mustBe } from '../../../utils/must-be'

export const tambahPaketInstansiAction = (
  data: TambahPaketInstansiFormSchema
) =>
  makeJwtPostRequestAction(`${process.env.API_URL}/admin/paket-instansi`, {
    nama: data.nama,
    batas_penyimpanan: fileSizeToMB(
      parseInt(data.totalPenyimpanan + ''),
      mustBe(data.totalPenyimpananUnit?.value, ['MB', 'GB', 'TB'], 'MB')
    ),
    batas_penyimpanan_pengajar: fileSizeToMB(
      parseInt(data.penyimpananPengajar + ''),
      mustBe(data.penyimpananPengajarUnit?.value, ['MB', 'GB', 'TB'], 'MB')
    ),
    batas_penyimpanan_peserta: fileSizeToMB(
      parseInt(data.penyimpananPeserta + ''),
      mustBe(data.penyimpananPesertaUnit?.value, ['MB', 'GB', 'TB'], 'MB')
    ),
    batas_pengguna: data.limitUser,
    batas_kelas: data.limitKelas,
    batas_kelas_pengajar: data.limitKelasPengajar,
    harga: data.harga,
    tipe: 'Custom',
  })
