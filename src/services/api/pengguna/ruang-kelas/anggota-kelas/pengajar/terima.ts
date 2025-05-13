import { makeJwtPutRequestAction } from '@/utils/action'

export const terimaAnggotaKelasAction = async (
  idKelas: string,
  idsPeserta: string[]
) =>
  makeJwtPutRequestAction(
    `${process.env.NEXT_PUBLIC_API_URL}/pengajar/kelas/${idKelas}/peserta-kelas`,
    {
      id_peserta: idsPeserta,
      status: 'Diterima',
    }
  )
