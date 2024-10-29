'use server'

import { makeJwtGetRequestAction } from '@/utils/action'

export type DataType = {
  instansi?: {
    id?: string
    nama?: string
    alamat?: string
    nama_pimpinan?: string
    telepon_pimpinan?: string
    telepon_instansi?: string
    tipe_sinkron?: string
    // kata_sandi_feeder?: string,
    // token_smart?: string,
    jenis?: string
    id_paket?: string
    jatuh_tempo?: string
    kuota_upload?: number
    id_pengguna?: string
    bio?: string
    logo?: string
    created_at?: string
    updated_at?: string
  }
  pengguna?: {
    id?: string
    username?: string
    tipe?: string
    nik?: string
    nama?: string
    jenis_kelamin?: string
    bio?: string
    hp?: string
    situs_web?: string
    kuota_upload?: number
    foto?: string
    terakhir_login?: string
    created_at?: string
    updated_at?: string
  }
  paket_instansi?: {
    id?: string
    nama?: string
    batas_penyimpanan?: number
    batas_pengguna?: number
    batas_penyimpanan_pengajar?: number
    batas_penyimpanan_peserta?: number
    batas_kelas?: number
    batas_kelas_pengajar?: number
    harga?: number
    tipe?: string
    created_at?: string
    updated_at?: string
  }
  jumlah_pengguna: number
  jumlah_penyimpanan_terpakai: number
  jumlah_kelas: number
}

export const lihatInstansiAction = async (id: string) =>
  makeJwtGetRequestAction<DataType>(
    `${process.env.API_URL}/admin/instansi/${id}`
  )
