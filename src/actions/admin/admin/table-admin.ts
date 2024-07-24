import {
  ControlledAsyncTableActionProps,
  ControlledAsyncTableActionType,
} from '@/components/ui/controlled-async-table'
import { listObjectFromList } from '@/utils/object'

export const tableAdminAction = async ({
  page = 1,
  search = '',
  sort,
  filters,
}: ControlledAsyncTableActionProps): Promise<ControlledAsyncTableActionType> => {
  const data = [...Array(10)].map((_, idx) => ({
    id: idx + 1,
    nama: 'Nama Asli',
    username: 'admin',
    email: 'admin@gmail.com',
    lastLogin: '02 Desember 2023',
  }))

  return { data: data, totalData: 50 }
}
