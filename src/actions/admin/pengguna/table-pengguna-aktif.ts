'use server'

import {
  ControlledAsyncTableActionProps,
  ControlledAsyncTableActionType,
} from '@/components/ui/controlled-async-table'

export const tablePenggunaAktifAction = async ({
  page = 1,
  search = '',
  sort,
  filters,
}: ControlledAsyncTableActionProps): Promise<ControlledAsyncTableActionType> => {
  const data = [
    {
      id: 1,
      nama: 'Terra diagtora',
      instansi: 'UIN SUSKA RIAU',
      instansiMore: 2,
      jenis: 'Pengajar',
    },
    {
      id: 2,
      nama: 'Terra diagtora',
      instansi: 'UIN SUSKA RIAU',
      instansiMore: 1,
      jenis: 'Pengajar, Peserta',
    },
    {
      id: 3,
      nama: 'Terra diagtora',
      instansi: 'UIN SUSKA RIAU',
      instansiMore: 0,
      jenis: 'Peserta',
    },
    {
      id: 4,
      nama: 'Terra diagtora',
      instansi: 'Umum',
      instansiMore: 0,
      jenis: 'Peserta',
    },
    {
      id: 5,
      nama: 'Terra diagtora',
      instansi: 'Universitas Riau',
      instansiMore: 1,
      jenis: 'Pengajar',
    },
    {
      id: 6,
      nama: 'Terra diagtora',
      instansi: 'UIN SUSKA RIAU',
      instansiMore: 2,
      jenis: 'Pengajar',
    },
    {
      id: 7,
      nama: 'Terra diagtora',
      instansi: 'UIN SUSKA RIAU',
      instansiMore: 2,
      jenis: 'Pengajar, Peserta',
    },
    {
      id: 8,
      nama: 'Terra diagtora',
      instansi: 'UIN SUSKA RIAU',
      instansiMore: 2,
      jenis: 'Pengajar',
    },
    {
      id: 9,
      nama: 'Terra diagtora',
      instansi: 'UIN SUSKA RIAU',
      instansiMore: 2,
      jenis: 'Pengajar',
    },
    {
      id: 10,
      nama: 'Terra diagtora',
      instansi: 'UIN SUSKA RIAU',
      instansiMore: 2,
      jenis: 'Pengajar',
    },
  ]

  return { data: data, totalData: 50 }
}
