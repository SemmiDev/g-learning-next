import Card from '@/components/ui/card'
import Image from 'next/image'
import { Button, Text, Title } from 'rizzui'
import { BsThreeDots } from 'react-icons/bs'
import cn from '@/utils/class-names'
import imagePhoto from '@public/images/photo.png'
import imagePreview from '@public/images/preview-video.png'
import Link from 'next/link'
import { routes } from '@/config/routes'
import CardSeparator from '@/components/ui/card-separator'
import DropdownMoreAction from './dropdown-more-action'

export default function Materi3Card({ className }: { className?: string }) {
  return (
    <Card className={cn('flex flex-col px-0 py-0', className)}>
      <div className="flex justify-between items-start px-4 py-2">
        <div className="flex space-x-3">
          <Image src={imagePhoto} alt="foto" className="w-12 h-12 rounded-lg" />
          <div className="flex flex-col">
            <Text className="text-base font-semibold text-gray-dark">
              Prabroro Janggar
            </Text>
            <Text className="text-[.75rem] font-medium">30 Menit</Text>
          </div>
        </div>
        <DropdownMoreAction />
      </div>
      <CardSeparator />
      <div className="flex flex-col px-4 py-2">
        <Title as="h5" className="font-semibold">
          Judul Diskusi + Gambar dan Video Mata Kuliah Aljabar Linier
        </Title>
        <Text className="text-gray-dark truncate">
          Ini merupakan catatan dari sebuah diskui yang telah dibuat, cukup di
          buat dalam 2 kalimat dan tambahkan.
        </Text>
        <div className="flex justify-center mt-4">
          <div className="flex max-w-8/12 max-h-60">
            <Image
              src={imagePreview}
              alt="preview"
              className="object-contain"
            />
          </div>
        </div>
      </div>
      <CardSeparator />
      <div className="p-2">
        <Link href={`${routes.kelas}/diskusi/detail`}>
          <Button size="sm" className="w-full">
            Buka Kelas
          </Button>
        </Link>
      </div>
    </Card>
  )
}
