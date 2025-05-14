import { makeJwtGetRequestApi } from '@/utils/api'

export type DataType = {
  id: string
  id_kelas: string
  id_peserta: string
  status: string
  created_at: string
  updated_at: string
  nama: string
  email: string
  username: string
  foto: string
}

export const lihatPesertaKelasApi = async (
  jwt: string,
  idKelas: string,
  idPeserta: string
) =>
  makeJwtGetRequestApi<DataType>(
    `${process.env.NEXT_PUBLIC_API_URL}/pengajar/kelas/${idKelas}/peserta-kelas/${idPeserta}`,
    jwt
  )
