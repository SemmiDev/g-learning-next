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
      tanggal: '12 Januari 2024',
      jenis: 'Advance',
      biaya: 5000000,
      invoice: 'INV/01/04/24',
    },
    {
      id: 2,
      tanggal: '12 April 2024',
      jenis: 'Advance',
      biaya: 5000000,
      invoice: 'INV/01/04/24',
    },
    {
      id: 3,
      tanggal: '12 Juli 2024',
      jenis: 'Premium',
      biaya: 3000000,
      invoice: 'INV/01/04/24',
    },
    {
      id: 4,
      tanggal: '14 Oktober 2024',
      jenis: 'Premium',
      biaya: 3000000,
      invoice: 'INV/01/04/24',
    },
    {
      id: 5,
      tanggal: '11 Januari 2023',
      jenis: 'Basic',
      biaya: 1500000,
      invoice: 'INV/01/04/24',
    },
  ]

  return { data: data, totalData: 10 }
}
