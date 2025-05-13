import { makeJwtGetRequestTableAction } from '@/utils/action'

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
  nama_pemilik: string
  status: 'Diterima' | 'Pengajuan' | null
}

export const listTemukanKelasAction = async ({
  page = 1,
  search = '',
}: {
  page?: number
  search?: string
}) =>
  makeJwtGetRequestTableAction<DataType>(
    `${process.env.NEXT_PUBLIC_API_URL}/kelas-publik`,
    {
      current_page: page,
      keyword: search,
      per_page: 20,
    }
  )
