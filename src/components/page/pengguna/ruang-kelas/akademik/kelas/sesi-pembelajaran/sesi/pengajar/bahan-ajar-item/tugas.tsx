import { DataType } from '@/actions/pengguna/ruang-kelas/aktifitas/list'
import { Text, TextSpan, Time } from '@/components/ui'
import cn from '@/utils/class-names'
import { stripHtmlAndEllipsis } from '@/utils/text'
import { BsClipboardPlus } from 'react-icons/bs'
import { LuBook } from 'react-icons/lu'

type TugasItemProps = {
  data: DataType
  className?: string
}

export default function TugasItem({ data, className }: TugasItemProps) {
  return (
    <div className={cn('flex gap-x-2 px-2 py-4', className)}>
      <div className="flex justify-center items-center size-[2.625rem] btn-item-violet rounded shrink-0">
        <BsClipboardPlus className="size-5" />
      </div>
      <div className="flex flex-col gap-y-1">
        <Text size="sm" weight="semibold">
          {data.aktifitas?.judul || '-'}
        </Text>
        <Text size="sm" className="line-clamp-2">
          {stripHtmlAndEllipsis(data.aktifitas?.deskripsi ?? '', 200)}
        </Text>
        {data.aktifitas?.batas_waktu && (
          <Text size="sm" weight="semibold">
            Batas Waktu Pengumpulan:{' '}
            <TextSpan color="danger">
              <Time date={data.aktifitas.batas_waktu} format="datetime" />
            </TextSpan>
          </Text>
        )}
        <Text size="sm" variant="lighter" className="flex items-center">
          <LuBook className="size-3 mr-1" />
          {data.file_aktifitas?.length} Berkas
        </Text>
      </div>
    </div>
  )
}
