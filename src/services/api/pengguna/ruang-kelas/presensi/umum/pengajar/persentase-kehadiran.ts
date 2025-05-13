import { makeJwtGetRequestAction } from '@/utils/action'

export type DataType = {
  persentase_hadir: number
  persentase_izin: number
  persentase_sakit: number
  persentase_alpha: number
}

export const dataPersentaseKehadiranAction = async (id: string) =>
  makeJwtGetRequestAction<DataType>(
    `${process.env.NEXT_PUBLIC_API_URL}/pengajar/kelas/${id}/absensi/persentase-kehadiran`
  )
