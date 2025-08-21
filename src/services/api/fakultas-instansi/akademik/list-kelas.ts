import { makeJwtGetRequestTableApi } from '@/utils/api'

export type DataType = {
  kelas: {
    id: string
    id_instansi: string
    nama_kelas: string
    sub_judul: string
    id_kelas_instansi: string
    id_kelas_semester: string
    status: string
    deskripsi: string
    tipe: 'Akademik' | 'Publik' | 'Privat'
    kode_unik: string
    id_sms: string
    thumbnail: string
    total_pertemuan: number
    created_at: string
    updated_at: string
    nama_instansi: string
    verifikasi_instansi: boolean
  }
  jadwal: [
    {
      id: string
      id_kelas: string
      hari: string
      waktu_mulai: string
      waktu_sampai: string
      zona_waktu: string
      ruangan: string
      created_at: string
      updated_at: string
    }
  ]
  total_peserta: number
  pengajar: [
    {
      id: string
      username: string
      nama: string
      foto: string
    }
  ]
  ringkasan_kelas: {
    total_pertemuan: number
    total_pertemuan_terlaksana: number
    total_kehadiran_pengajar: number
    persentase_kehadiran_peserta: number
    persentase_kehadiran_pengajar: number
  }
}

export const listKelasApi = async ({
  jwt,
  page = 1,
  search = '',
  semester,
  idSms,
}: {
  jwt: string
  page?: number
  search?: string
  semester?: string
  idSms?: string
}) =>
  makeJwtGetRequestTableApi<DataType>(
    `${process.env.NEXT_PUBLIC_API_URL}/fakultas/kelas`,
    jwt,
    {
      current_page: page,
      keyword: search,
      per_page: 10,
      semester,
      id_sms: idSms,
    }
  )
