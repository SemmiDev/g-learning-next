import Card from '@/components/ui/card'
import Image from 'next/image'
import { ActionIcon, Button, Text, Textarea, Title } from 'rizzui'
import { BsChatSquareText, BsFillSendFill } from 'react-icons/bs'
import cn from '@/utils/class-names'
import imagePhoto from '@public/images/photo.png'
import imagePreview from '@public/images/preview-video.png'
import CardSeparator from '@/components/ui/card-separator'
import DropdownMoreAction from './dropdown-more-action'

export default function InformasiCard({ className }: { className?: string }) {
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
          Judul Informasi
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
      <div className="flex flex-col px-4 py-2">
        <div className="flex justify-end">
          <Button
            size="sm"
            variant="text"
            className="flex space-x-1 items-center text-gray-dark hover:text-primary"
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
    </Card>
  )
}
