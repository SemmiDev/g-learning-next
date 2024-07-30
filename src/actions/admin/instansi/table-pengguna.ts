'use server'

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
      penyimpanan: '10GB/1TB',
      kelas: '4/10',
    },
    {
      id: 2,
      nama: 'Berra diagtora',
      jenis: 'Siswa',
      penyimpanan: '90GB/1TB',
      kelas: '0/10',
    },
    {
      id: 3,
      nama: 'Serra diagtora',
      jenis: 'Siswa',
      penyimpanan: '10GB/1TB',
      kelas: '0/10',
    },
    {
      id: 4,
      nama: 'Aerra diagtora',
      jenis: 'Siswa',
      penyimpanan: '10GB/1TB',
      kelas: '0/10',
    },
    {
      id: 5,
      nama: 'Kerra diagtora',
      jenis: 'Siswa',
      penyimpanan: '10GB/1TB',
      kelas: '4/10',
    },
    {
      id: 6,
      nama: 'Derra diagtora',
      jenis: 'Pengajar',
      penyimpanan: '10GB/1TB',
      kelas: '4/10',
    },
    {
      id: 7,
      nama: 'Derra diagtora',
      jenis: 'Pengajar',
      penyimpanan: '10GB/1TB',
      kelas: '4/10',
    },
    {
      id: 8,
      nama: 'Derra diagtora',
      jenis: 'Pengajar',
      penyimpanan: '10GB/1TB',
      kelas: '4/10',
    },
    {
      id: 9,
      nama: 'Derra diagtora',
      jenis: 'Pengajar',
      penyimpanan: '10GB/1TB',
      kelas: '4/10',
    },
    {
      id: 10,
      nama: 'Derra diagtora',
      jenis: 'Pengajar',
      penyimpanan: '10GB/1TB',
      kelas: '4/10',
    },
  ]

  return { data: data, totalData: 50 }
}
