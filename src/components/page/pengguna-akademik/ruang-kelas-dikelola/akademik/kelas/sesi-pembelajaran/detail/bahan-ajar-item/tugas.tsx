import { Text, TextSpan } from '@/components/ui'
import cn from '@/utils/class-names'
import { BsClipboardPlus } from 'react-icons/bs'
import { LuBook } from 'react-icons/lu'

type TugasItemProps = {
  className?: string
}

export default function TugasItem({ className }: TugasItemProps) {
  return (
    <div className={cn('flex gap-x-2 px-2 py-4', className)}>
      <div className="flex justify-center items-center size-[2.625rem] btn-item-violet rounded shrink-0">
        <BsClipboardPlus className="size-5" />
      </div>
      <div className="flex flex-col gap-y-1">
        <Text size="sm" weight="semibold">
          Judul Tugas
        </Text>
        <Text size="sm" className="line-clamp-2">
          Ini merupakan catatan dari sebuah kuis yang telah dibuat, cukup di
          buat dalam 2 kalimat dan tambahkan selengkapnya. Ini merupakan catatan
          dari sebuah diskusi yang telah dibagikan.
        </Text>
        <Text size="sm" weight="semibold">
          Batas Waktu Pengumpulan:{' '}
          <TextSpan color="danger">13 April 2024 | 23:59 WIB</TextSpan>
        </Text>
        <Text size="sm" variant="lighter" className="flex items-center">
          <LuBook className="size-3 mr-1" />1 Berkas
        </Text>
      </div>
    </div>
  )
}
