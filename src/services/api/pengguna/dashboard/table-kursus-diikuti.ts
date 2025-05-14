import {
  ControlledAsyncTableActionProps,
  ControlledAsyncTableActionType,
  ControlledAsyncTableApiProps,
} from '@/components/ui/controlled-async-table'
import imageKelas from '@public/images/list-kelas.png'

type DataType = {
  id: string
  nama: string
  modul: number
  progress: number
  creator: string
  image: string
}

export const tableKursusDiikutiApi = async ({
  jwt = '',
  page = 1,
  search = '',
  sort,
}: ControlledAsyncTableApiProps): Promise<
  ControlledAsyncTableActionType<DataType>
> => {
  const list: DataType[] = [
    {
      id: '1',
      nama: 'Sistem Informasi',
      modul: 75,
      progress: 12,
      creator: 'Garuda Cyber Institute',
      image: imageKelas.src,
    },
    {
      id: '2',
      nama: 'Biologi Tinggat Lanjut',
      modul: 15,
      progress: 0,
      creator: 'Visual Vulcream',
      image: imageKelas.src,
    },
    {
      id: '3',
      nama: 'Aljabar Linear',
      modul: 5,
      progress: 5,
      creator: 'Garuda Cyber Institute',
      image: imageKelas.src,
    },
    {
      id: '4',
      nama: 'Jaringan dan Keamanan Data',
      modul: 35,
      progress: 35,
      creator: 'Randa Nurhidayat',
      image: imageKelas.src,
    },
    {
      id: '5',
      nama: 'Human Computer Interaction',
      modul: 12,
      progress: 12,
      creator: 'Kelas Juwara',
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
