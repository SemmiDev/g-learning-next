'use server'

import {
  ControlledAsyncTableActionProps,
  ControlledAsyncTableActionType,
} from '@/components/ui/controlled-async-table'

export const tableRiwayatPembayaranAction = async ({
  page = 1,
  search = '',
  sort,
  filters,
}: ControlledAsyncTableActionProps): Promise<ControlledAsyncTableActionType> => {
  const data = [
    {
      id: 1,
      tanggal: '2024-01-12',
      jenis: 'Advance',
      biaya: 5000000,
      invoice: 'INV/01/04/24',
    },
    {
      id: 2,
      tanggal: '2024-04-12',
      jenis: 'Advance',
      biaya: 5000000,
      invoice: 'INV/01/04/24',
    },
    {
      id: 3,
      tanggal: '2024-07-12',
      jenis: 'Premium',
      biaya: 3000000,
      invoice: 'INV/01/04/24',
    },
    {
      id: 4,
      tanggal: '2024-10-14',
      jenis: 'Premium',
      biaya: 3000000,
      invoice: 'INV/01/04/24',
    },
    {
      id: 5,
      tanggal: '2023-01-11',
      jenis: 'Basic',
      biaya: 1500000,
      invoice: 'INV/01/04/24',
    },
  ]

  return { data: data, totalData: 10 }
}
