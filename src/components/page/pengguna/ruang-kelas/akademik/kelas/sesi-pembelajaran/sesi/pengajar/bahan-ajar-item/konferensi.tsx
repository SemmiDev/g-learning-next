import { DataType } from '@/actions/pengguna/ruang-kelas/aktifitas/list'
import { Text } from '@/components/ui'
import cn from '@/utils/class-names'
import { stripHtmlAndEllipsis } from '@/utils/text'
import { BsWebcam } from 'react-icons/bs'

type KonferensiItemProps = {
  data: DataType
  className?: string
}

export default function KonferensiItem({
  data,
  className,
}: KonferensiItemProps) {
  return (
    <div className={cn('flex gap-x-2 px-2 py-4', className)}>
      <div className="flex justify-center items-center size-[2.625rem] btn-item-red rounded shrink-0">
        <BsWebcam className="size-5" />
      </div>
      <div className="flex flex-col gap-y-1">
        <Text size="sm" weight="semibold">
          {data.aktifitas?.judul || '-'}
        </Text>
        <Text size="sm" className="line-clamp-2">
          {stripHtmlAndEllipsis(data.aktifitas?.deskripsi ?? '', 200)}
        </Text>
      </div>
    </div>
  )
}
