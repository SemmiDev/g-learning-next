import { Text } from '@/components/ui'
import { LuChevronDown } from 'react-icons/lu'
import { KelasItemType } from './kelas-button'
import ActionIcon from '@/components/ui/button/action-icon'
import { MdClose } from 'react-icons/md'

type SelectedFileProps = {
  kelas: KelasItemType
  onRemove?: () => void
}

export default function SelectedKelas({ kelas, onRemove }: SelectedFileProps) {
  return (
    <div className="flex justify-between items-center flex-1 gap-2">
      <div className="flex flex-col">
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
      <div className="flex items-center space-x-1">
        <ActionIcon
          size="sm"
          variant="outline-hover-colorful"
          color="danger"
          onClick={(e) => {
            e.stopPropagation()
            onRemove && onRemove()
          }}
        >
          <MdClose />
        </ActionIcon>
        <LuChevronDown size={20} />
      </div>
    </div>
  )
}
