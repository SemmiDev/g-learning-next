import { ControlledAsyncTableApiProps } from '@/components/ui/controlled-async-table'
import { makeJwtGetRequestTableApi } from '@/utils/api'

export type DataType = {
  id: string
  nama: string
  username: string
  email: string
  terakhir_login: string | null
  id_sms: string
  nm_lemb: string
  nm_lemb_inggris: string | null
  nm_jenj_didik: string
  tipe: 'Prodi' | 'Fakultas'
}

export const tableAdminProdiApi = async ({
  jwt,
  page = 1,
  search = '',
  sort,
}: ControlledAsyncTableApiProps) =>
  makeJwtGetRequestTableApi<DataType>(
    `${process.env.NEXT_PUBLIC_API_URL}/instansi/akun-prodi`,
    jwt,
    {
      current_page: page,
      keyword: search,
      sort_by: sort?.name,
      order: sort?.order,
    }
  )
