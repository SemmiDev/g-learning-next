import { makeJwtGetRequestApi } from '@/utils/api'

export type DataType = {
  instansi: {
    id: string
    nama: string
    alamat: string
    nama_pimpinan: string
    telepon_pimpinan: string
    telepon_instansi: string
    tipe_sinkron: string
    kata_sandi_feeder: string
    token_smart: string
    jenis: string
    id_paket: string
    jatuh_tempo: string
    kuota_upload: number
    id_pengguna: string
    bio: string
    logo: string
    semester_aktif: string
  }
  paket_instansi: {
    id: string
    nama: string
    batas_penyimpanan: number
    batas_pengguna: number
    batas_penyimpanan_pengajar: number
    batas_penyimpanan_peserta: number
    batas_kelas: number
    batas_kelas_pengajar: number
    harga: number
    tipe: string
  }
  total_penggunaan_penyimpanan: number
  total_pengguna: number
  total_kelas: number
}

export const dataProfilApi = async (jwt: string) =>
  makeJwtGetRequestApi<DataType>(
    `${process.env.NEXT_PUBLIC_API_URL}/instansi/profil-instansi`,
    jwt
  )
