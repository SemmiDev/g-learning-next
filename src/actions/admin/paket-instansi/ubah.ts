'use server'

import { UbahPaketInstansiFormSchema } from '@/components/page/admin/paket-instansi/modal/ubah'
import { makeJwtPutRequestAction } from '@/utils/action'
import { fileSizeToMB } from '@/utils/bytes'
import { mustBe } from '@/utils/must-be'

export const ubahPaketInstansiAction = (
  id: string,
  data: UbahPaketInstansiFormSchema
) =>
  makeJwtPutRequestAction(`${process.env.API_URL}/admin/paket-instansi/${id}`, {
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
  })
