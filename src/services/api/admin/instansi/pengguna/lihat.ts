import { makeJwtGetRequestApi } from '@/utils/api'

type DataType = {
  id_pengguna_instansi: string
  nama: string
  tipe: string
  foto: string
  bio: string
  username: string
  hp: string
  email: string
  situs_web: string
  jenis_kelamin: string
  paket: string
}

export const lihatPenggunaInstansiApi = async (
  jwt: string,
  idInstansi: string,
  idPengguna: string
) =>
  makeJwtGetRequestApi<DataType>(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/instansi/${idInstansi}/anggota/${idPengguna}`,
    jwt
  )
