'use server'

import {
  ControlledAsyncTableActionProps,
  ControlledAsyncTableActionType,
} from '@/components/ui/controlled-async-table'

export const tablePenggunaDiblokirAction = async ({
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
      waktuBlokir: '2022-12-03 13:00',
      keterangan: 'Akun Palsu',
    },
    {
      id: 2,
      nama: 'Terra diagtora',
      jenis: 'Siswa',
      waktuBlokir: '2022-12-03 13:00',
      keterangan: 'Menyebabkan Kekacauan',
    },
    {
      id: 3,
      nama: 'Terra diagtora',
      jenis: 'Siswa',
      waktuBlokir: '2022-12-03 13:00',
      keterangan: 'Akun Palsu',
    },
    {
      id: 4,
      nama: 'Terra diagtora',
      jenis: 'Pengajar',
      waktuBlokir: '2022-12-03 13:00',
      keterangan: 'Akun Palsu',
    },
    {
      id: 5,
      nama: 'Terra diagtora',
      jenis: 'Pengajar',
      waktuBlokir: '2022-12-03 13:00',
      keterangan: 'Akun Palsu',
    },
  ]

  return {
    success: true,
    data: {
      list: data,
      pagination: {
        page: 1,
        lastPage: 1,
        perPage: 5,
        totalData: 5,
        from: 1,
        to: 1,
      },
    },
  }
}
