import { makeJwtGetRequestTableApi } from '@/utils/api'

export type DataType = {
  id: string
  id_kelas: string
  id_pertemuan_kelas: string
  id_peserta: string
  status: string | null
  latitude: number | null
  longitude: number | null
  swafoto: string | null
  created_at: string
  updated_at: string
  username: string
  nama: string
  email: string
  swafoto_url: string | null
  foto: string
}

export const cekPresensiSemuaPesertaSesiApi = async (
  jwt: string,
  idKelas: string,
  idSesi: string
) =>
  makeJwtGetRequestTableApi<DataType>(
    `${process.env.NEXT_PUBLIC_API_URL}/kelas-akademik/${idKelas}/pertemuan/${idSesi}/absensi-peserta`,
    jwt,
    {
      per_page: 10000,
    }
  )
