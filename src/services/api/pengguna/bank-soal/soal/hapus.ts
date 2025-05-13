import { makeJwtDeleteRequestAction } from '@/utils/action'

export const hapusSoalAction = async (idBankSoal: string, id: string) =>
  makeJwtDeleteRequestAction(
    `${process.env.NEXT_PUBLIC_API_URL}/bank-soal/${idBankSoal}/soal/${id}`
  )
