import { makeJwtPutRequestApi } from '@/utils/api'

export const terimaAnggotaKelasApi = async (
  jwt: string,
  idKelas: string,
  idsPeserta: string[]
) =>
  makeJwtPutRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/pengajar/kelas/${idKelas}/peserta-kelas`,
    jwt,
    {
      id_peserta: idsPeserta,
      status: 'Diterima',
    }
  )
