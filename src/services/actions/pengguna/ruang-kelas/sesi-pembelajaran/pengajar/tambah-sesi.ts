'use server'

import { TambahSesiFormSchema } from '@/components/pages/pengguna/ruang-kelas/akademik/kelas/sesi-pembelajaran/pengajar/modal/tambah-sesi'
import { makeJwtPostRequestAction } from '@/utils/action'

export const tambahSesiAction = async (
  idKelas: string,
  data: TambahSesiFormSchema
) =>
  makeJwtPostRequestAction(
    `${process.env.API_URL}/kelas-akademik/${idKelas}/pertemuan`,
    {
      judul: data.judul,
      pertemuan: data.pertemuan,
      hari: data.hari?.value,
      waktu_mulai: data.mulaiWaktu,
      waktu_sampai: data.sampaiWaktu,
      jenis_absensi_peserta: data.jenisAbsenPeserta,
      id_ruangan: data.ruangan?.value,
      jenis_absensi_pengajar: 'GPS dan Swafoto',
    }
  )
