'use server'

import { SortType } from '@/hooks/use-table-async'
import { makeJwtGetRequestTableAction } from '@/utils/action'

export type DataType = {
  id: string
  id_parent: string | null
  nama: string
  deskripsi: string
  content: string
  ekstensi: string
  tipe: 'Dokumen' | 'Audio' | 'Video' | 'Gambar' | 'Folder' | 'Teks' | null
  url: string
  ukuran: number
  id_pengguna: string
  id_instansi: string | null
  created_at: string
  updated_at: string
  id_aktifitas: string
  judul_aktifitas: string
  tipe_aktifitas:
    | 'Diskusi'
    | 'Materi'
    | 'Konferensi'
    | 'Penugasan'
    | 'Ujian'
    | 'Pengumuman'
  created_at_file_aktifitas: string
}

export const listBerkasKelasAction = async ({
  page = 1,
  search = '',
  sort,
  idKelas,
}: {
  page?: number
  search?: string
  sort?: SortType
  idKelas: string
}) =>
  makeJwtGetRequestTableAction<DataType>(
    `${process.env.API_URL}/kelas/${idKelas}/berkas`,
    {
      current_page: page,
      keyword: search,
      sort_by: sort?.name,
      order: sort?.order,
      per_page: 20,
    }
  )
