import {
  Button,
  Card,
  CardSeparator,
  FileListItem,
  PustakaMediaFileType,
  Text,
  Title,
} from '@/components/ui'
import { routes } from '@/config/routes'
import cn from '@/utils/class-names'
import imagePhoto from '@public/images/photo.png'
import Image from 'next/image'
import Link from 'next/link'

export default function DiskusiCard({ className }: { className?: string }) {
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
    <Card className={cn('flex flex-col px-0 py-0', className)}>
      <div className="flex justify-between items-start px-4 py-2">
        <div className="flex space-x-3">
          <Image src={imagePhoto} alt="foto" className="size-12 rounded-lg" />
          <div className="flex flex-col">
            <Text weight="semibold" variant="dark">
              Prabroro Janggar
            </Text>
            <Text size="xs" weight="medium" variant="lighter">
              30 Menit
            </Text>
          </div>
        </div>
      </div>
      <CardSeparator />
      <div className="flex flex-col px-4 py-2">
        <Title as="h4" size="1.5xl" weight="semibold" className="mb-1">
          Judul Materi Diskusi
        </Title>
        <Text size="sm" variant="dark" className="truncate">
          Ini merupakan catatan dari sebuah diskui yang telah dibuat, cukup di
          buat dalam 2 kalimat dan tambahkan.
        </Text>
        <div className="flex flex-col space-y-2 mt-4">
          {files.map((file, idx) => (
            <FileListItem file={file} key={idx} />
          ))}
        </div>
      </div>
      <CardSeparator />
      <div className="p-2">
        <Link href={`${routes.peserta.kelas}/diskusi/detail`}>
          <Button size="sm" className="w-full">
            Masuk Kelas
          </Button>
        </Link>
      </div>
    </Card>
  )
}
