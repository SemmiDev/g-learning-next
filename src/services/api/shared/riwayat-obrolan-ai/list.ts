import { ControlledAsyncTableApiProps } from '@/components/ui/controlled-async-table'
import { makeJwtGetRequestTableApi } from '@/utils/api'

export type DataType = {
  id: string
  id_pengguna: string
  judul: string
  created_at: string
  updated_at: string
}

export const listRiwayatObrolanAiApi = async ({
  jwt,
  page = 1,
}: ControlledAsyncTableApiProps) =>
  makeJwtGetRequestTableApi<DataType>(
    `${process.env.NEXT_PUBLIC_API_URL}/ai/chat`,
    jwt,
    {
      current_page: page,
      per_page: 20,
    }
  )
