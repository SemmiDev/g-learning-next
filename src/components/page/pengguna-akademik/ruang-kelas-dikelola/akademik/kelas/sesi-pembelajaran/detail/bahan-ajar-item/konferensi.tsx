import { Text } from '@/components/ui'
import cn from '@/utils/class-names'
import { BsWebcam } from 'react-icons/bs'

type KonferensiItemProps = {
  className?: string
}

export default function KonferensiItem({ className }: KonferensiItemProps) {
  return (
    <div className={cn('flex gap-x-2 px-2 py-4', className)}>
      <div className="flex justify-center items-center size-[2.625rem] btn-item-red rounded shrink-0">
        <BsWebcam className="size-5" />
      </div>
      <div className="flex flex-col gap-y-1">
        <Text size="sm" weight="semibold">
          Judul Pertemuan Daring
        </Text>
        <Text size="sm" className="line-clamp-2">
          Ini merupakan catatan dari sebuah konferensi yang telah dibuat, cukup
          di buat dalam 2 kalimat dan tambahkan selengkapnya. Ini merupakan
          catatan dari sebuah diskui yang telah dibuat, cukup di buat dalam 2
          kalimat dan tambahkan selengkapnya.
        </Text>
      </div>
    </div>
  )
}
