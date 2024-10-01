import { ActionIcon, Button, Text } from '@/components/ui'
import cn from '@/utils/class-names'
import imagePhoto from '@public/images/photo.png'
import Image from 'next/image'
import { BsChatSquareText, BsFillSendFill } from 'react-icons/bs'
import { Textarea } from 'rizzui'

export default function KomentarSectionZero({
  className,
}: {
  className?: string
}) {
  return (
    <div className={cn('flex flex-col', className)}>
      <div className="flex items-center space-x-2">
        <Image src={imagePhoto} alt="profil" className="size-8 rounded-md" />
        <Textarea
          className="flex-1"
          rows={2}
          placeholder="Tulis Komentar..."
        ></Textarea>
        <ActionIcon size="sm" variant="outline">
          <BsFillSendFill size={12} />
        </ActionIcon>
      </div>
      <div className="flex mt-2">
        <Button
          size="sm"
          variant="text"
          className="flex space-x-1 items-center text-gray-dark p-0 hover:text-primary"
        >
          <BsChatSquareText size={14} />
          <Text size="2xs" weight="semibold">
            0 Komentar
          </Text>
        </Button>
      </div>
    </div>
  )
}
