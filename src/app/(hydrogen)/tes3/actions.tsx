import {
  ControlledAsyncTableActionProps,
  ControlledAsyncTableActionType,
} from '@/components/ui/controlled-async-table'
import { wait } from '@/utils/wait'

export const tesAsyncAction = async ({
  page = 1,
  search = '',
}: ControlledAsyncTableActionProps): Promise<ControlledAsyncTableActionType> => {
  await wait(1000)

  const data = [
    {
      id: 1,
      nama: 'Nama 1',
      email: 'email1@namaweb.com',
    },
    {
      id: 2,
      nama: 'Nama 2',
      email: 'email2@namaweb.com',
    },
    {
      id: 3,
      nama: 'Nama 3',
      email: 'email3@namaweb.com',
    },
    {
      id: 4,
      nama: 'Nama 4',
      email: 'email4@namaweb.com',
    },
    {
      id: 5,
      nama: 'Nama 5',
      email: 'email5@namaweb.com',
    },
  ]

  return { data: data, totalData: 10 }
}
