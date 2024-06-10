import { Text } from '@/components/ui'
import { LuChevronDown } from 'react-icons/lu'
import { KelasItemType } from './kelas-button'

type SelectedFileProps = { kelas: KelasItemType; onOpenList?(): void }

export default function SelectedKelas({
  kelas,
  onOpenList,
}: SelectedFileProps) {
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
            weight="semibold"
            variant="lighter"
            title={kelas.kelas}
            className="truncate"
          >
            {kelas.kelas}
          </Text>
        )}
        {kelas.instansi && (
          <Text
            size="sm"
            weight="semibold"
            variant="lighter"
            title={kelas.instansi}
            className="truncate"
          >
            {kelas.instansi}
          </Text>
        )}
      </div>
      <LuChevronDown size={20} />
    </div>
  )
}
