import {
  ActionIcon,
  Button,
  Card,
  CardSeparator,
  Pagination,
  Text,
  Title,
} from '@/components/ui'
import cn from '@/utils/class-names'
import imagePhoto from '@public/images/photo.png'
import Image from 'next/image'
import { BsPencil, BsThreeDots } from 'react-icons/bs'
import { PiMagnifyingGlass } from 'react-icons/pi'
import { Checkbox, Dropdown } from 'rizzui'

type PresensiCardProps = {
  className?: string
}

export default function PresensiCard({ className }: PresensiCardProps) {
  return (
    <Card className={cn('flex flex-col p-0', className)}>
      <div className="flex justify-between gap-x-2">
        <Title as="h6" weight="semibold" className="px-2 py-3 leading-4">
          Presensi
        </Title>
        <Dropdown placement="bottom-end">
          <Dropdown.Trigger>
            <Button as="span" size="sm" variant="text">
              <BsThreeDots className="size-4" />
            </Button>
          </Dropdown.Trigger>
          <Dropdown.Menu className="w-52 divide-y !py-0">
            <div className="py-2">
              <Dropdown.Item className="text-gray-dark">
                <BsPencil className="text-warning size-4 mr-2" />
                Ubah Jenis Presensi
              </Dropdown.Item>
              <Dropdown.Item className="text-gray-dark">
                <BsPencil className="text-warning size-4 mr-2" />
                Ubah Data Presensi
              </Dropdown.Item>
            </div>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div>
        {[...Array(10)].map((val, idx) => {
          return (
            <div
              key={idx}
              className="flex justify-between items-center border-t-2 border-t-gray-100 px-2 py-4"
            >
              <div className="flex items-center gap-x-3">
                <Image
                  src={imagePhoto}
                  alt="profil"
                  className="size-[2.375rem] rounded-md"
                />
                <div className="flex flex-col">
                  <Text size="sm" weight="semibold" variant="dark">
                    Annitsa Bestweden
                  </Text>
                  <Text size="2xs" weight="medium" variant="lighter">
                    email@namaweb.com
                  </Text>
                </div>
              </div>
              <div className="flex gap-x-8">
                <div className="flex gap-x-2">
                  <ActionIcon size="sm" rounded="lg" className="rounded-lg">
                    <Text size="xs" weight="semibold">
                      H
                    </Text>
                  </ActionIcon>
                  <ActionIcon
                    size="sm"
                    rounded="lg"
                    variant="outline"
                    className="rounded-lg"
                  >
                    <Text size="xs" weight="semibold">
                      I
                    </Text>
                  </ActionIcon>
                  <ActionIcon
                    size="sm"
                    rounded="lg"
                    variant="outline"
                    className="rounded-lg"
                  >
                    <Text size="xs" weight="semibold">
                      S
                    </Text>
                  </ActionIcon>
                  <ActionIcon
                    size="sm"
                    rounded="lg"
                    variant="outline"
                    className="rounded-lg"
                  >
                    <Text size="xs" weight="semibold">
                      A
                    </Text>
                  </ActionIcon>
                </div>

                <ActionIcon
                  size="sm"
                  rounded="lg"
                  variant="outline-colorful"
                  className="rounded-lg"
                >
                  <PiMagnifyingGlass />
                </ActionIcon>
              </div>
            </div>
          )
        })}
      </div>
      <CardSeparator />
      <div className="flex justify-between items-center p-2">
        <Text size="2xs" variant="lighter">
          Menampilkan 10 dari 30 data
        </Text>
        <Pagination total={30} />
      </div>
    </Card>
  )
}
