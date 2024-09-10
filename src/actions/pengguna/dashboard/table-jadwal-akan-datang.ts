'use server'

import {
  ControlledAsyncTableActionProps,
  ControlledAsyncTableActionType,
} from '@/components/ui/controlled-async-table'
import imageKelas from '@public/images/list-kelas.png'

type DataType = {
  id: string
  kelas: string
  tanggal: string
  jam: string
  instansi: string
  image: string
}

export const tableJadwalAkanDatangAction = async ({
  page = 1,
  search = '',
  sort,
}: ControlledAsyncTableActionProps): Promise<
  ControlledAsyncTableActionType<DataType>
> => {
  const list: DataType[] = [
    {
      id: '1',
      kelas: 'Sistem Informasi',
      tanggal: 'Kamis, 22 Desember 2023',
      jam: '15:00-17:00 WIB',
      instansi: 'UIN SUSKA Riau',
      image: imageKelas.src,
    },
    {
      id: '2',
      kelas: 'Biology tingkat lanjut',
      tanggal: 'Kamis, 22 Desember 2023',
      jam: '15:00-17:00 WIB',
      instansi: 'UIN SUSKA Riau',
      image: imageKelas.src,
    },
    {
      id: '3',
      kelas: 'Aljabar Linear',
      tanggal: 'Kamis, 22 Desember 2023',
      jam: '15:00-17:00 WIB',
      instansi: 'UIN SUSKA Riau',
      image: imageKelas.src,
    },
    {
      id: '4',
      kelas: 'Jaringan dan Keamanan Data',
      tanggal: 'Kamis, 22 Desember 2023',
      jam: '15:00-17:00 WIB',
      instansi: 'UIN SUSKA Riau',
      image: imageKelas.src,
    },
    {
      id: '5',
      kelas: 'Human Computer Interaction',
      tanggal: 'Kamis, 22 Desember 2023',
      jam: '15:00-17:00 WIB',
      instansi: 'UIN SUSKA Riau',
      image: imageKelas.src,
    },
  ]

  return {
    success: true,
    data: {
      list,
      pagination: {
        page,
        perPage: 5,
        lastPage: 1,
        totalData: list.length,
      },
    },
  }
}
