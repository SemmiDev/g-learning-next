import { makeJwtGetRequestAction } from '@/utils/action'

export type DataType = {
  sync_log_mahasiswa: {
    id: string
    correlation_id: string
    id_instansi: string | null
    entity: string
    status: string
    total_data: number
    processed_data: number
    start_time: string
    end_time: string | null
    error_message: string | null
    created_at: string
    updated_at: string
  }
  sync_log_dosen: {
    id: string
    correlation_id: string
    id_instansi: string | null
    entity: string
    status: string
    total_data: number
    processed_data: number
    start_time: string
    end_time: string | null
    error_message: string | null
    created_at: string
    updated_at: string
  }
  sync_log_kelas: {
    id: string
    correlation_id: string
    id_instansi: string | null
    entity: string
    status: string
    total_data: number
    processed_data: number
    start_time: string
    end_time: string | null
    error_message: string | null
    created_at: string
    updated_at: string
  }
  sync_log_perkuliahan: {
    id: string
    correlation_id: string
    id_instansi: null
    entity: string
    status: string
    total_data: number
    processed_data: number
    start_time: string
    end_time: string | null
    error_message: string | null
    created_at: string
    updated_at: string
  }
  persentase_sync_log_mahasiswa: number
  persentase_sync_log_dosen: number
  persentase_sync_log_kelas: number
  persentase_sync_log_perkuliahan: number
  persentase_keseluruhan: number
}

export const statusSinkronSmartAction = async () =>
  makeJwtGetRequestAction<DataType>(
    `${process.env.NEXT_PUBLIC_API_URL}/instansi/singkronisasi/terbaru`
  )
