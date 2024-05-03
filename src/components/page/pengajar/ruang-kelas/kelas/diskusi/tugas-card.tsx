import {
  Button,
  Card,
  CardSeparator,
  Text,
  TextSpan,
  Title,
} from '@/components/ui'
import { routes } from '@/config/routes'
import cn from '@/utils/class-names'
import imagePhoto from '@public/images/photo.png'
import Image from 'next/image'
import Link from 'next/link'
import DropdownMoreAction from './dropdown-more-action'
import KomentarSectionShort from './komentar-section-short'

export default function TugasCard({ className }: { className?: string }) {
  return (
    <Card className={cn('flex flex-col px-0 py-0', className)}>
      <div className="flex justify-between items-start px-4 py-2">
        <div className="flex space-x-3">
          <Image src={imagePhoto} alt="foto" className="w-12 h-12 rounded-lg" />
          <div className="flex flex-col">
            <Text weight="semibold" variant="dark">
              Prabroro Janggar
            </Text>
            <Text size="xs" weight="medium" variant="lighter">
              30 Menit
            </Text>
          </div>
        </div>
        <DropdownMoreAction />
      </div>
      <CardSeparator />
      <div className="flex flex-col px-4 py-2">
        <Title as="h5" weight="semibold" className="text-[1.375rem] mb-2">
          Judul Tugas
        </Title>
        <Text size="sm" variant="dark" className="truncate">
          Ini merupakan catatan dari sebuah diskui yang telah dibuat, cukup di
          buat dalam 2 kalimat dan tambahkan.
        </Text>
        <Text weight="semibold" variant="dark" className="mt-4">
          Batas Waktu Pengumpulan:{' '}
          <TextSpan color="danger">13 April 2024, 23:59 WIB</TextSpan>
        </Text>
      </div>
      <CardSeparator />
      <div className="p-2">
        <Link href={`${routes.kelas}/diskusi/detail/tugas`}>
          <Button size="sm" className="w-full">
            Cek Tugas
          </Button>
        </Link>
        <KomentarSectionShort className="pt-4 px-2" />
      </div>
    </Card>
  )
}
