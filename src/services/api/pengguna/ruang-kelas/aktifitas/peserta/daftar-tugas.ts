import { makeJwtGetRequestTableApi } from '@/utils/api'

export type DataType = {
  id: string
  judul: string
  status: string
  deskripsi: string
  batas_waktu: string | null
}

export const daftarTugasPesertaApi = async ({
  jwt,
  page = 1,
  idKelas,
}: {
  jwt: string
  page?: number
  idKelas: string
}) =>
  makeJwtGetRequestTableApi<DataType>(
    `${process.env.NEXT_PUBLIC_API_URL}/peserta/kelas/${idKelas}/daftar-tugas`,
    jwt,
    {
      current_page: page,
      per_page: 50,
    }
  )
