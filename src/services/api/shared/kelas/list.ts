import { makeJwtGetRequestTableApi } from '@/utils/api'

export type DataType = {
  kelas: {
    id: string
    id_instansi: string | null
    nama_kelas: string
    sub_judul: string
    id_kelas_instansi: string
    id_kelas_semester: string
    status: string
    deskripsi: string
    tipe: string
    kode_unik: string
    id_sms: string
    thumbnail: string
    total_pertemuan: number
    created_at: string
    updated_at: string
    nama_instansi: string
    verifikasi_instansi: boolean
  }
  jadwal: {
    id: string
    id_kelas: string
    hari: string
    waktu_mulai: string
    waktu_sampai: string
    zona_waktu: string
  }[]
  total_peserta: number
  pengajar: {
    id: string
    username: string
    nama: string
    foto: string
  }[]
  total_pertemuan_terlaksana: number
  peran: 'Pengajar' | 'Peserta'
}

export const listKelasApi = async ({
  jwt,
  page = 1,
  search = '',
  kategori,
  semester,
}: {
  jwt: string
  page?: number
  search?: string
  kategori?: 'Dikelola' | 'Diikuti'
  semester?: string
}) =>
  makeJwtGetRequestTableApi<DataType>(
    `${process.env.NEXT_PUBLIC_API_URL}/kelas`,
    jwt,
    {
      current_page: page,
      keyword: search,
      per_page: 20,
      kategori,
      semester,
    }
  )
