import { TambahPaketPenggunaFormSchema } from '@/components/pages/admin/paket-pengguna/modal/tambah'
import { makeJwtPostRequestApi } from '@/utils/api'
import { fileSizeToMB } from '@/utils/bytes'
import { mustBe } from '@/utils/must-be'

export const tambahPaketPenggunaApi = async (
  jwt: string,
  data: TambahPaketPenggunaFormSchema
) =>
  makeJwtPostRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/paket-pengguna`,
    jwt,
    {
      nama: data.nama,
      batas_penyimpanan: fileSizeToMB(
        data.totalPenyimpanan || 0,
        mustBe(data.totalPenyimpananUnit?.value, ['MB', 'GB', 'TB'], 'MB')
      ),
      batas_kelas: data.limitKelas,
      batas_anggota_kelas: data.limitAnggotaKelas,
      harga: data.harga,
    }
  )
