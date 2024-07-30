'use server'

import {
  ControlledAsyncTableActionProps,
  ControlledAsyncTableActionType,
} from '@/components/ui/controlled-async-table'

export const tableInstansiAction = async ({
  page = 1,
  search = '',
  sort,
  filters,
}: ControlledAsyncTableActionProps): Promise<ControlledAsyncTableActionType> => {
  const data = [
    {
      id: 1,
      nama: 'UIN SUSKA Riau',
      paket: 'Basic',
      jumlahPengguna: '3.000/5.000',
      jumlahPenyimpanan: '10TB/100TB',
      jumlahKelas: '50/500',
      jatuhTempo: '12 Januari 2030',
    },
    {
      id: 2,
      nama: 'Universitas Islam Indonesia',
      paket: 'Premium',
      jumlahPengguna: '3.000/10.000',
      jumlahPenyimpanan: '10TB/100TB',
      jumlahKelas: '50/500',
      jatuhTempo: '12 Januari 2030',
    },
    {
      id: 3,
      nama: 'Universitas Mercu Buana',
      paket: 'Basic',
      jumlahPengguna: '3.000/5.000',
      jumlahPenyimpanan: '10TB/100TB',
      jumlahKelas: '50/500',
      jatuhTempo: '12 Januari 2030',
    },
    {
      id: 4,
      nama: 'Binus University',
      paket: 'Basic',
      jumlahPengguna: '3.000/5.000',
      jumlahPenyimpanan: '10TB/100TB',
      jumlahKelas: '50/500',
      jatuhTempo: '12 Januari 2030',
    },
    {
      id: 5,
      nama: 'Politeknik Pelayaran Malahayati',
      paket: 'Basic',
      jumlahPengguna: '3.000/5.000',
      jumlahPenyimpanan: '10TB/100TB',
      jumlahKelas: '50/500',
      jatuhTempo: '12 Januari 2030',
    },
    {
      id: 6,
      nama: 'Politeknik Caltex Riau',
      paket: 'Basic',
      jumlahPengguna: '3.000/5.000',
      jumlahPenyimpanan: '10TB/100TB',
      jumlahKelas: '50/500',
      jatuhTempo: '12 Januari 2030',
    },
    {
      id: 7,
      nama: 'UIN SUSKA Riau',
      paket: 'Basic',
      jumlahPengguna: '3.000/5.000',
      jumlahPenyimpanan: '10TB/100TB',
      jumlahKelas: '50/500',
      jatuhTempo: '12 Januari 2030',
    },
    {
      id: 8,
      nama: 'UIN SUSKA Riau',
      paket: 'Basic',
      jumlahPengguna: '3.000/5.000',
      jumlahPenyimpanan: '10TB/100TB',
      jumlahKelas: '50/500',
      jatuhTempo: '12 Januari 2030',
    },
    {
      id: 9,
      nama: 'UIN SUSKA Riau',
      paket: 'Basic',
      jumlahPengguna: '3.000/5.000',
      jumlahPenyimpanan: '10TB/100TB',
      jumlahKelas: '50/500',
      jatuhTempo: '12 Januari 2030',
    },
    {
      id: 10,
      nama: 'UIN SUSKA Riau',
      paket: 'Basic',
      jumlahPengguna: '3.000/5.000',
      jumlahPenyimpanan: '10TB/100TB',
      jumlahKelas: '50/500',
      jatuhTempo: '12 Januari 2030',
    },
  ]

  return { data: data, totalData: 50 }
}
