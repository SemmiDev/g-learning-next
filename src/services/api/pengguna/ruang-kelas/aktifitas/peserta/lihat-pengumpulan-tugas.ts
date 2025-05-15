import { makeJwtGetRequestApi } from '@/utils/api'

export type DataType = {
  id: string | null
  id_aktifitas: string
  id_peserta: string
  nama: string
  foto: string
  nilai: number | null
  catatan_pengajar: string
  catatan_peserta: string
  status_pengumpulan: boolean
  waktu_pengumpulan: string | null
  berkas:
    | {
        id: string
        id_parent: string | null
        nama: string
        deskripsi: string
        content: string
        ekstensi: string
        tipe:
          | 'Dokumen'
          | 'Audio'
          | 'Video'
          | 'Gambar'
          | 'Folder'
          | 'Teks'
          | null
        url: string
        ukuran: number
        id_pengguna: string
        id_instansi: string | null
        created_at: string
        updated_at: string
      }[]
    | null
}

export const lihatPengumpulanTugasApi = async (
  jwt: string,
  idKelas: string,
  idAktifitas: string
) =>
  makeJwtGetRequestApi<DataType>(
    `${process.env.NEXT_PUBLIC_API_URL}/peserta/kelas/${idKelas}/aktifitas/${idAktifitas}/penilaian-tugas`,
    jwt
  )
