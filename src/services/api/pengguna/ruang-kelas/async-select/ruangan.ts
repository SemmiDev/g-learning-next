import { AsyncPaginateSelectActionProps } from '@/components/ui/select/async-paginate'
import { makeJwtGetRequestSelectDataApi } from '@/utils/api'

export type DataType = {
  id: string
  nama_ruangan: string
  kode_ruangan: string
  keterangan: string
  kapasitas: number
  id_instansi: string
  created_at: string
  updated_at: string
}

export const ruanganMakeSelectDataApi =
  (idKelas: string) =>
  async ({ jwt, page, search }: AsyncPaginateSelectActionProps) =>
    makeJwtGetRequestSelectDataApi<DataType>(
      `${process.env.NEXT_PUBLIC_API_URL}/kelas-akademik/${idKelas}/ruangan`,
      jwt,
      {
        per_page: 20,
        current_page: page,
        keyword: search,
        sort_by: 'nama_ruangan',
      }
    )
