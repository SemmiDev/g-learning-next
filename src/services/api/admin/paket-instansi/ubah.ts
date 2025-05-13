import { UbahPaketInstansiFormSchema } from '@/components/pages/admin/paket-instansi/modal/ubah'
import { makeJwtPutRequestApi } from '@/utils/api'
import { fileSizeToMB } from '@/utils/bytes'
import { mustBe } from '@/utils/must-be'

export const ubahPaketInstansiApi = async (
  jwt: string,
  id: string,
  data: UbahPaketInstansiFormSchema
) =>
  makeJwtPutRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/paket-instansi/${id}`,
    jwt,
    {
      nama: data.nama,
      batas_penyimpanan: fileSizeToMB(
        data.totalPenyimpanan || 0,
        mustBe(data.totalPenyimpananUnit?.value, ['MB', 'GB', 'TB'], 'MB')
      ),
      batas_penyimpanan_pengajar: fileSizeToMB(
        data.penyimpananPengajar || 0,
        mustBe(data.penyimpananPengajarUnit?.value, ['MB', 'GB', 'TB'], 'MB')
      ),
      batas_penyimpanan_peserta: fileSizeToMB(
        data.penyimpananPeserta || 0,
        mustBe(data.penyimpananPesertaUnit?.value, ['MB', 'GB', 'TB'], 'MB')
      ),
      batas_pengguna: data.limitUser,
      batas_kelas: data.limitKelas,
      batas_kelas_pengajar: data.limitKelasPengajar,
      harga: data.harga,
    }
  )
