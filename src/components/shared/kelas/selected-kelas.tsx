import { Text } from '@/components/ui'
import ActionIcon from '@/components/ui/button/action-icon'
import RandomCoverImage from '@/components/ui/random/cover-image'
import Image from 'next/image'
import { LuChevronDown } from 'react-icons/lu'
import { MdClose } from 'react-icons/md'
import { KelasItemType } from './kelas-button'

type SelectedFileProps = {
  kelas: KelasItemType
  onRemove?: () => void
}

export default function SelectedKelas({ kelas, onRemove }: SelectedFileProps) {
  return (
    <div className="flex justify-between items-center flex-1 gap-2 min-w-0">
      <div className="flex items-center gap-x-2 min-w-0">
        <div className="h-16 max-w-20 rounded overflow-clip shrink-0">
          {!!kelas.cover ? (
            <Image
              src={kelas.cover}
              alt="kelas"
              width={128}
              height={128}
              className="h-full w-full object-cover"
            />
          ) : (
            <RandomCoverImage
              persistentKey={kelas.id}
              alt="kelas"
              width={128}
              height={128}
              className="h-full w-full object-cover"
            />
          )}
        </div>
        <div className="flex flex-col min-w-0">
          <Text
            size="sm"
            weight="semibold"
            variant="dark"
            title={kelas.program}
            className="truncate"
          >
            {kelas.program}
          </Text>
          {kelas.kelas && (
            <Text
              size="sm"
              weight="medium"
              variant="lighter"
              title={kelas.kelas}
              className="truncate"
            >
              {kelas.kelas}
            </Text>
          )}

          <Text
            size="sm"
            weight="medium"
            variant="lighter"
            title={kelas.instansi}
            className="truncate"
          >
            {kelas.instansi || 'Umum'}
          </Text>
        </div>
      </div>

      <div className="flex items-center gap-x-1">
        {!!onRemove && (
          <ActionIcon
            size="sm"
            variant="outline-hover-colorful"
            color="danger"
            onClick={(e) => {
              e.stopPropagation()
              onRemove()
            }}
          >
            <MdClose />
          </ActionIcon>
        )}
        <LuChevronDown size={20} />
      </div>
    </div>
  )
}
