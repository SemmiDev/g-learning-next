import { ActionIcon, Button, Text } from '@/components/ui'
import cn from '@/utils/class-names'
import imagePhoto from '@public/images/photo.png'
import Image from 'next/image'
import { BsChatSquareText, BsFillSendFill } from 'react-icons/bs'
import { FaChevronDown } from 'react-icons/fa'
import { Textarea } from 'rizzui'

export default function KomentarSectionShort({
  className,
}: {
  className?: string
}) {
  return (
    <div className={cn('flex flex-col', className)}>
      <div className="flex items-center space-x-2">
        <Image src={imagePhoto} alt="profile" className="w-8 h-8 rounded-md" />
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
            6 Komentar
          </Text>
        </Button>
      </div>
      <div className="space-y-4 ps-4 mt-2">
        <div className="flex space-x-2">
          <Image
            src={imagePhoto}
            alt="profile"
            className="w-8 h-8 rounded-md"
          />
          <div className="flex flex-col items-start text-gray-dark">
            <Text weight="semibold">Anjal Karman</Text>
            <Text weight="medium">
              ini adalah komentar dari user yang membuat komentar ini adalah
              komentar dari user yang membuat komentar ini adalah komentar dari
              user yang membuat komentar ini adalah komentar dari user yang
              membuat komentar
            </Text>
            <div className="flex space-x-2 mt-1">
              <Text size="sm" weight="medium">
                4 hari
              </Text>
              <Button
                size="sm"
                variant="text"
                className="text-sm font-bold h-auto p-0"
              >
                Balas
              </Button>
            </div>
            <Button
              size="sm"
              variant="text"
              className="text-sm font-bold h-auto p-0 mt-1"
            >
              <FaChevronDown className="me-1" /> 3 balasan
            </Button>
          </div>
        </div>
        <div className="flex justify-center">
          <Button variant="text-colorful" color="primary">
            Muat Lebih
          </Button>
        </div>
      </div>
    </div>
  )
}
