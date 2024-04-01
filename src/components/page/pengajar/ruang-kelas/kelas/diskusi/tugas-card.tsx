import Card from '@/components/ui/card'
import Image from 'next/image'
import { ActionIcon, Button, Text, Textarea, Title } from 'rizzui'
import { BsChatSquareText, BsFillSendFill, BsThreeDots } from 'react-icons/bs'
import cn from '@/utils/class-names'
import imagePhoto from '@public/images/photo.png'
import Link from 'next/link'
import { routes } from '@/config/routes'
import CardSeparator from '@/components/ui/card-separator'
import DropdownMoreAction from './dropdown-more-action'

export default function TugasCard({ className }: { className?: string }) {
  return (
    <Card className={cn('flex flex-col px-0 py-0', className)}>
      <div className="flex justify-between items-start px-4 py-2">
        <div className="flex space-x-3">
          <Image src={imagePhoto} alt="foto" className="w-12 h-12 rounded-lg" />
          <div className="flex flex-col">
            <Text className="text-base font-semibold text-gray-dark">
              Prabroro Janggar
            </Text>
            <Text className="text-xs font-medium">30 Menit</Text>
          </div>
        </div>
        <DropdownMoreAction />
      </div>
      <CardSeparator />
      <div className="flex flex-col px-4 py-2">
        <Title as="h5" className="font-semibold">
          Judul Tugas
        </Title>
        <Text className="text-gray-dark truncate">
          Ini merupakan catatan dari sebuah diskui yang telah dibuat, cukup di
          buat dalam 2 kalimat dan tambahkan.
        </Text>
        <Text className="text-base font-semibold text-gray-dark mt-4">
          Batas Waktu Pengumpulan:{' '}
          <span className="text-red-500">13 April 2024, 23:59 WIB</span>
        </Text>
      </div>
      <CardSeparator />
      <div className="p-2">
        <Link href={`${routes.kelas}/diskusi/detail`}>
          <Button size="sm" className="bg-blue-400 w-full hover:bg-blue-600">
            Cek Tugas
          </Button>
        </Link>
        <div className="flex flex-col p-2">
          <div className="flex justify-start">
            <Button
              size="sm"
              variant="text"
              className="flex space-x-1 items-center text-gray-dark px-0 hover:text-primary"
            >
              <BsChatSquareText size={14} />
              <Text className="text-2xs font-semibold">6 Komentar</Text>
            </Button>
          </div>
          <div className="flex items-center space-x-2 mt-1">
            <Image
              src={imagePhoto}
              alt="profile"
              className="w-8 h-8 rounded-md"
            />
            <Textarea
              className="flex-1"
              rows={2}
              placeholder="Tulis Komentar..."
            ></Textarea>
            <ActionIcon size="sm" variant="outline">
              <BsFillSendFill size={12} />
            </ActionIcon>
          </div>
        </div>
      </div>
    </Card>
  )
}
