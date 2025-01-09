import {
  Badge,
  Button,
  Card,
  CardSeparator,
  Text,
  Time,
  Title,
} from '@/components/ui'
import cn from '@/utils/class-names'
import { ComponentType, Dispatch, SetStateAction, useState } from 'react'
import {
  BsCardChecklist,
  BsClipboardPlus,
  BsFileRichtext,
  BsWebcam,
} from 'react-icons/bs'
import { IconBaseProps } from 'react-icons/lib'
import { LuClock, LuFileText, LuMapPin, LuPackage } from 'react-icons/lu'
import { useWindowSize } from 'react-use'
import { Popover } from 'rizzui'

type JadwalCardProps = {
  className?: string
}

export default function JadwalCard({ className }: JadwalCardProps) {
  const [popoverIsOpen, setPopoverIsOpen] = useState(false)

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  return (
    <Card className={cn('p-0', className)}>
      <div className="flex flex-wrap justify-between items-center gap-x-2 p-2">
        <Title as="h5" weight="semibold">
          Jadwal Minggu Ini
        </Title>
        <Text size="sm" weight="medium" variant="lighter">
          Tanggal hari ini: <Time date={today} />
        </Text>
      </div>
      <Tanggal />
      <CardSeparator />
      <div className="flex flex-col px-2 py-2">
        <div className="flex gap-x-2">
          <Text weight="semibold">Judul Sesi</Text>
          <Badge size="sm" variant="flat" color="success">
            Sesi sedang berlangsung
          </Badge>
        </div>
        <div className="flex gap-x-4 mt-1">
          <div className="flex items-center gap-x-1">
            <LuPackage className="size-4" />
            <Text size="sm" weight="medium">
              Sesi 7
            </Text>
          </div>
          <div className="flex items-center gap-x-1">
            <LuClock className="size-4" />
            <Text size="sm" weight="medium">
              12:00 - 14:00
            </Text>
          </div>
          <div className="flex items-center gap-x-1">
            <LuMapPin className="size-4" />
            <Text size="sm" weight="medium">
              GB 202
            </Text>
          </div>
        </div>
        <div className="flex gap-x-2 mt-4">
          <Popover isOpen={popoverIsOpen} setIsOpen={setPopoverIsOpen}>
            <Popover.Trigger>
              <Button size="sm" variant="outline-colorful" className="flex-1">
                Tambah Bahan Ajar
              </Button>
            </Popover.Trigger>
            <Popover.Content className="flex flex-col px-0 py-1">
              <PopoverItem
                title="Materi"
                color="green"
                Icon={BsFileRichtext}
                setIsOpen={setPopoverIsOpen}
              />
              <PopoverItem
                title="Tugas"
                color="violet"
                Icon={BsClipboardPlus}
                setIsOpen={setPopoverIsOpen}
              />
              <PopoverItem
                title="Ujian"
                color="blue"
                Icon={BsCardChecklist}
                setIsOpen={setPopoverIsOpen}
              />
              <PopoverItem
                title="Conference"
                color="red"
                Icon={BsWebcam}
                setIsOpen={setPopoverIsOpen}
              />
            </Popover.Content>
          </Popover>
          <Button size="sm" className="flex-1">
            Masuk Sesi
          </Button>
        </div>
      </div>
    </Card>
  )
}

function Tanggal({ className }: { className?: string }) {
  const curr = new Date()
  curr.setHours(0, 0, 0, 0)

  const [currentDay, setCurrentDay] = useState(curr.getDay())

  const first = curr.getDate() - curr.getDay()

  return (
    <div className={cn('flex justify-between', className)}>
      {[...Array(7)].map((_, i) => {
        return (
          <TanggalItem
            key={i}
            date={new Date(curr.setDate(first + i))}
            active={currentDay == i}
          />
        )
      })}
    </div>
  )
}

function TanggalItem({ date, active }: { date: Date; active?: boolean }) {
  const size = useWindowSize()

  return (
    <button className="flex flex-col items-center gap-y-1 rounded w-full py-2 hover:bg-muted sm:px-2">
      <Text
        size="sm"
        weight="semibold"
        color={active ? 'primary' : 'gray'}
        variant={active ? 'dark' : 'default'}
      >
        <Time date={date} customFormat={size.width > 768 ? 'dddd' : 'ddd'} />
      </Text>
      <div
        className={cn(
          'flex justify-center items-center',
          size.width > 768 ? 'size-8' : 'size-6',
          active ? 'bg-primary rounded-full' : ''
        )}
      >
        <Text
          size="sm"
          weight="semibold"
          className={cn(active ? 'text-white' : 'text-gray')}
        >
          <Time date={date} customFormat="DD" />
        </Text>
      </div>
    </button>
  )
}

function PopoverItem({
  title,
  color,
  Icon,
  setIsOpen,
  onClick,
}: {
  title: string
  color: 'green' | 'violet' | 'blue' | 'red' | 'indigo'
  Icon: ComponentType<IconBaseProps>
  setIsOpen?: Dispatch<SetStateAction<boolean>>
  onClick?: () => void
}) {
  return (
    <button
      className="flex gap-x-2 px-2 py-1 hover:bg-muted/40"
      onClick={() => {
        onClick && onClick()
        setIsOpen && setIsOpen(false)
      }}
    >
      <div
        className={cn(
          'flex justify-center items-center size-[1.375rem] rounded-sm',
          `btn-item-${color}`
        )}
      >
        <Icon className="size-2.5" />
      </div>
      <Text size="sm" weight="semibold">
        {title}
      </Text>
    </button>
  )
}
