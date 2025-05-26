import { makeJwtGetRequestTableApi } from '@/utils/api'

export type DataType = {
  kelas: {
    id: string
    id_instansi: string | null
    id_pengajar: string
    nama_kelas: string
    sub_judul: string
    id_kelas_instansi: string
    status: string
    deskripsi: string
    tipe: string
    kode_unik: string
    thumbnail: string
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
  peran: 'Pengajar' | 'Peserta'
}

export const listKelasApi = async ({
  jwt,
  page = 1,
  search = '',
  kategori,
}: {
  jwt: string
  page?: number
  search?: string
  kategori?: 'Dikelola' | 'Diikuti'
}) =>
  makeJwtGetRequestTableApi<DataType>(
    `${process.env.NEXT_PUBLIC_API_URL}/kelas`,
    jwt,
    {
      current_page: page,
      keyword: search,
      per_page: 20,
      kategori,
    }
  )
