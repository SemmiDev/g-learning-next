import { UbahSesiFormSchema } from '@/components/pages/pengguna/ruang-kelas/akademik/kelas/sesi-pembelajaran/pengajar/modal/ubah-sesi'
import { makeJwtPutRequestApi } from '@/utils/api'

export const ubahSesiPembelajaranApi = async (
  jwt: string,
  idKelas: string,
  id: string,
  data: UbahSesiFormSchema
) =>
  makeJwtPutRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/kelas-akademik/${idKelas}/pertemuan/${id}`,
    jwt,
    {
      judul: data.judul,
      hari: data.hari?.value,
      waktu_mulai: data.mulaiWaktu,
      waktu_sampai: data.sampaiWaktu,
      id_ruangan: data.ruangan?.value,
      jenis_absensi_peserta: data.jenisAbsenPeserta,
    }
  )
