'use server'

import { UbahPaketPenggunaFormSchema } from '@/components/page/admin/paket-pengguna/modal/ubah'
import { makeJwtPutRequestAction } from '@/utils/action'
import { fileSizeToMB } from '@/utils/bytes'
import { mustBe } from '@/utils/must-be'

export const ubahPaketPenggunaAction = async (
  id: string,
  data: UbahPaketPenggunaFormSchema
) =>
  makeJwtPutRequestAction(`${process.env.API_URL}/paket-pengguna/${id}`, {
    nama: data.nama,
    batas_penyimpanan: fileSizeToMB(
      data.totalPenyimpanan || 0,
      mustBe(data.totalPenyimpananUnit?.value, ['MB', 'GB', 'TB'], 'MB')
    ),
    batas_kelas: data.limitKelas,
    batas_anggota_kelas: data.limitAnggotaKelas,
    harga: data.harga,
  })
