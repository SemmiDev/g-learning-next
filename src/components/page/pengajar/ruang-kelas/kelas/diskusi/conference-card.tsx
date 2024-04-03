import Card from '@/components/ui/card'
import Image from 'next/image'
import { ActionIcon, Textarea } from 'rizzui'
import { BsCameraVideo, BsChatSquareText, BsFillSendFill } from 'react-icons/bs'
import cn from '@/utils/class-names'
import imagePhoto from '@public/images/photo.png'
import Link from 'next/link'
import { routes } from '@/config/routes'
import CardSeparator from '@/components/ui/card-separator'
import DropdownMoreAction from './dropdown-more-action'
import { Button, Text, Title } from '@/components/ui'

export default function ConferenceCard({ className }: { className?: string }) {
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
          Judul Conference
        </Title>
        <Text size="sm" variant="dark" className="truncate">
          Ini merupakan catatan dari sebuah diskui yang telah dibuat, cukup di
          buat dalam 2 kalimat dan tambahkan.
        </Text>
      </div>
      <CardSeparator />
      <div className="p-2">
        <Link href={`${routes.kelas}/diskusi/detail`}>
          <Button size="sm" color="primary" className="w-full">
            <BsCameraVideo size={16} className="me-2" /> Buka Kelas
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
              <Text size="2xs" weight="semibold">
                6 Komentar
              </Text>
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
