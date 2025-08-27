import { makeJwtPostRequestApi } from '@/utils/api'

export const duplikatBahanAjarSesiApi = async (
  jwt: string,
  idKelasSumber: string,
  idKelas: string,
  ids: string[]
) =>
  makeJwtPostRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/duplikat-bahan-ajar`,
    jwt,
    {
      sumber_id_kelas: idKelasSumber,
      tujuan_id_kelas: idKelas,
      id_pertemuan: ids,
    }
  )
