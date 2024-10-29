'use server'

import { TambahPaketPenggunaFormSchema } from '@/components/page/admin/paket-pengguna/modal/tambah'
import { makeJwtPostRequestAction } from '@/utils/action'
import { fileSizeToMB } from '@/utils/bytes'
import { mustBe } from '@/utils/must-be'

export const tambahPaketPenggunaAction = async (
  data: TambahPaketPenggunaFormSchema
) =>
  makeJwtPostRequestAction(`${process.env.API_URL}/paket-pengguna`, {
    nama: data.nama,
    batas_penyimpanan: fileSizeToMB(
      data.totalPenyimpanan || 0,
      mustBe(data.totalPenyimpananUnit?.value, ['MB', 'GB', 'TB'], 'MB')
    ),
    batas_kelas: data.limitKelas,
    batas_anggota_kelas: data.limitAnggotaKelas,
    harga: data.harga,
  })
