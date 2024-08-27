'use server'

import { UbahPaketPenggunaFormSchema } from '@/components/page/admin/paket-pengguna/modal/ubah'
import { makeJwtPutRequestAction } from '@/utils/action'
import { FILE_SIZE_UNIT_SCALE } from '@/utils/bytes'

export const ubahPaketPenggunaAction = (
  id: string,
  data: UbahPaketPenggunaFormSchema
) =>
  makeJwtPutRequestAction(`${process.env.API_URL}/paket-pengguna/${id}`, {
    nama: data.nama,
    batas_penyimpanan:
      parseInt(data.totalPenyimpanan + '') *
      Math.pow(
        FILE_SIZE_UNIT_SCALE,
        data.totalPenyimpananUnit?.value === 'GB'
          ? 1
          : data.totalPenyimpananUnit?.value === 'TB'
          ? 2
          : 0
      ),
    batas_kelas: data.limitKelas,
    batas_anggota_kelas: data.limitAnggotaKelas,
    harga: data.harga,
  })
