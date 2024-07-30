import {
  ControlledAsyncTableActionProps,
  ControlledAsyncTableActionType,
} from '@/components/ui/controlled-async-table'

export const tablePenggunaAction = async ({
  page = 1,
  search = '',
  sort,
  filters,
}: ControlledAsyncTableActionProps): Promise<ControlledAsyncTableActionType> => {
  const data = [
    {
      id: 1,
      nama: 'Terra diagtora',
      jenis: 'Pengajar',
      jumlahKelas: '12/50',
      penyimpanan: '3/10',
    },
    {
      id: 2,
      nama: 'Terra diagtora',
      jenis: 'Pengajar',
      jumlahKelas: '12/50',
      penyimpanan: '3/10',
    },
    {
      id: 3,
      nama: 'Terra diagtora',
      jenis: 'Siswa',
      jumlahKelas: '12/50',
      penyimpanan: '0/0',
    },
    {
      id: 4,
      nama: 'Terra diagtora',
      jenis: 'Pengajar',
      jumlahKelas: '12/50',
      penyimpanan: '3/10',
    },
    {
      id: 5,
      nama: 'Terra diagtora',
      jenis: 'Pengajar',
      jumlahKelas: '12/50',
      penyimpanan: '3/10',
    },
  ]

  return { data: data, totalData: 10 }
}
