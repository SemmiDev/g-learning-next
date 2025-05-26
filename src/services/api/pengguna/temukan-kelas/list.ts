import { makeJwtGetRequestTableApi } from '@/utils/api'

export type DataType = {
  kelas: {
    id: string
    id_instansi: string | null
    id_pengajar: string
    nama_kelas: string
    sub_judul: string
    id_kelas_instansi: string
    id_kelas_semester: string
    status: string
    deskripsi: string
    tipe: 'Akademik' | 'Publik' | 'Privat'
    kode_unik: string
    thumbnail: string
    total_pertemuan: number | null
    created_at: string
    updated_at: string
  }
  total_peserta: number
  pengajar: {
    id: string
    username: string
    nama: string
    foto: string
  }[]
  status: 'Diterima' | 'Pengajuan' | null
}

export const listTemukanKelasApi = async ({
  jwt,
  page = 1,
  search = '',
}: {
  jwt: string
  page?: number
  search?: string
}) =>
  makeJwtGetRequestTableApi<DataType>(
    `${process.env.NEXT_PUBLIC_API_URL}/kelas-publik`,
    jwt,
    {
      current_page: page,
      keyword: search,
      per_page: 20,
    }
  )
