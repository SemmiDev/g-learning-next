import { makeJwtGetRequestTableApi } from '@/utils/api'

export type DataType = {
  id: string
  id_parent: string | null
  id_pengguna: string
  nama: string
  foto: string
  diskusi: string
  jumlah_balasan: number
  created_at: string
}

export const listKomentarChildApi = async ({
  jwt,
  page = 1,
  idKelas,
  idAktifitas,
  idParent,
}: {
  jwt: string
  page?: number
  idKelas: string
  idAktifitas: string
  idParent: string
}) =>
  makeJwtGetRequestTableApi<DataType>(
    `${process.env.NEXT_PUBLIC_API_URL}/kelas/${idKelas}/aktifitas/${idAktifitas}/diskusi`,
    jwt,
    {
      current_page: page,
      per_page: 100,
      id_parent: idParent,
    }
  )
