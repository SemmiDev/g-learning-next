import { Text } from '@/components/ui'
import cn from '@/utils/class-names'
import { BsFileRichtext } from 'react-icons/bs'
import { LuBook } from 'react-icons/lu'

type MateriItemProps = {
  className?: string
}

export default function MateriItem({ className }: MateriItemProps) {
  return (
    <div className={cn('flex gap-x-2 px-2 py-4', className)}>
      <div className="flex justify-center items-center size-[2.625rem] btn-item-green rounded shrink-0">
        <BsFileRichtext className="size-5" />
      </div>
      <div className="flex flex-col gap-y-1">
        <Text size="sm" weight="semibold" className="line-clamp-2">
          Judul dari materinya nanti ada disini ya maksimal 2 baris aja
        </Text>
        <Text size="sm" className="line-clamp-2">
          Penjelasan singkat terkait materi yang dibuat nanti akan muncul
          disini.
        </Text>
        <Text size="sm" variant="lighter" className="flex items-center">
          <LuBook className="size-3 mr-1" />3 Berkas
        </Text>
      </div>
    </div>
  )
}
