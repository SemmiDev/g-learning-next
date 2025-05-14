import { listObjectFromList } from '@/utils/object'

export type DataItemType = {
  judul: string
  deskripsi: string
  waktu: string
  dibaca?: boolean
}

type DataType = {
  data: DataItemType[]
  nextPage: number | null
}

export async function loadMoreApi(
  jwt: string,
  page: number = 1
): Promise<DataType> {
  return {
    data: [
      {
        judul: 'Nama Kelas',
        deskripsi:
          '@onama orang Hal yang dilakukan oleh pengguna (Komen, buat diskusi baru, dll)',
        waktu: '2024-08-06 11:25:30',
        dibaca: true,
      },
      {
        judul: 'Judul pengumman aplikasi',
        deskripsi: 'Isi singkat dari pengumuman nanti tampila di sini',
        waktu: '2024-08-06 10:06:30',
        dibaca: true,
      },
      ...listObjectFromList(
        [
          {
            judul: 'Sistem Operasi',
            deskripsi:
              '@annitsa bestweden memberikan komentar pada judul diskusi',
            waktu: '2024-07-30 10:06:30',
          },
        ],
        7
      ),
      ...listObjectFromList(
        [
          {
            judul: 'Maintenance Sistem',
            deskripsi: 'Sistem akan melakukan maintenance pukul 23.00 WIB',
            waktu: '2024-07-13 10:06:30',
          },
        ],
        7
      ),
    ],
    nextPage: page < 5 ? page + 1 : null,
  }
}
