import { makeJwtGetRequestApi } from '@/utils/api'

export type DataType = {
  absensi_dosen: {
    tipe: 'GPS' | 'Swafoto' | 'Manual' | 'Otomatis' | 'QR Code'
    aktif: boolean
  }[]
  absensi_mahasiswa: {
    tipe: 'GPS' | 'Swafoto' | 'Manual' | 'Otomatis' | 'QR Code'
    aktif: boolean
  }[]
}

export const dataPengaturanPresensiApi = async (jwt: string) =>
  makeJwtGetRequestApi<DataType>(
    `${process.env.NEXT_PUBLIC_API_URL}/instansi/pengaturan-absensi`,
    jwt
  )
