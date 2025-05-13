import { makeJwtGetRequestAction } from '@/utils/action'

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
  google_drive: boolean
  penyimpanan: 'Internal' | 'External'
  created_at: string
  updated_at: string
}

export const lihatBerkasAction = async (id: string) =>
  makeJwtGetRequestAction<DataType>(
    `${process.env.NEXT_PUBLIC_API_URL}/pustaka-media/${id}`
  )
