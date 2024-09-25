import KomentarSectionFull from '@/components/page/peserta/ruang-kelas/kelas/diskusi/komentar-section-full'
import {
  Button,
  Card,
  CardSeparator,
  FileListItem,
  PustakaMediaFileType,
  ReadMore,
  Text,
  Title,
} from '@/components/ui'
import { routes } from '@/config/routes'
import Link from 'next/link'
import { RiArrowLeftLine } from 'react-icons/ri'

export default function DiskusiDetailPage() {
  const files: PustakaMediaFileType[] = [
    {
      id: '1',
      name: 'NamaFile.jpg',
      folder: false,
      size: 50,
      time: '2024-09-20T15:55:35+07:00',
    },
    {
      id: '2',
      name: 'NamaFile.pdf',
      folder: false,
      size: 280,
      time: '2024-09-20T15:55:35+07:00',
    },
    {
      id: '3',
      name: 'NamaFile.ext',
      folder: false,
      size: 500,
      time: '2024-09-20T15:55:35+07:00',
    },
  ]

  return (
    <>
      <div className="mt-4 mb-4">
        <Link href={routes.peserta.kelas}>
          <Button variant="text" color="primary" className="text-gray-dark">
            <RiArrowLeftLine size={18} className="" />{' '}
            <Text weight="medium" className="ml-2">
              Kembali
            </Text>
          </Button>
        </Link>
      </div>
      <div className="flex flex-wrap items-start space-y-8 lg:space-x-4 lg:space-y-0">
        <Card className="flex flex-col p-0 w-full lg:w-8/12">
          <div className="flex justify-between items-start px-4 py-2">
            <div className="flex flex-col">
              <Text size="lg" weight="semibold" variant="dark" className="mb-2">
                Judul Diskusi + Gambar dan Video Mata Kuliah Aljabar Linier
              </Text>
              <Text size="sm">
                <ReadMore truncate={200}>
                  Ini merupakan catatan dari sebuah diskusi yang telah dibuat,
                  cukup di buat dalam 2 kalimat dan tambahkan. Ini merupakan
                  catatan dari sebuah diskusi yang telah dibuat, cukup di buat
                  dalam 2 kalimat dan tambahkan. Ini merupakan catatan dari
                  sebuah diskusi yang telah dibuat, cukup di buat dalam 2
                  kalimat dan tambahkan. Ini merupakan catatan dari sebuah
                  diskusi yang telah dibuat, cukup di buat dalam 2 kalimat dan
                  tambahkan.
                </ReadMore>
              </Text>
            </div>
          </div>
          <CardSeparator />
          <KomentarSectionFull className="p-4" />
        </Card>
        <Card className="flex flex-col flex-1 p-0">
          <Title as="h6" weight="semibold" className="px-2 py-3 leading-4">
            Berkas Materi
          </Title>
          <CardSeparator />
          <div className="flex flex-col space-y-2 p-2">
            {files.map((file, idx) => (
              <FileListItem file={file} download key={idx} />
            ))}
          </div>
        </Card>
      </div>
    </>
  )
}
