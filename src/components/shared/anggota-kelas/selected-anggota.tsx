import { Text, Thumbnail } from '@/components/ui'
import ActionIcon from '@/components/ui/button/action-icon'
import { LuChevronDown } from 'react-icons/lu'
import { MdClose } from 'react-icons/md'
import { AnggotaKelasItemType } from './anggota-button'

type SelectedFileProps = {
  anggota: AnggotaKelasItemType
  onRemove?: () => void
}

export default function SelectedAnggota({
  anggota,
  onRemove,
}: SelectedFileProps) {
  return (
    <div className="flex justify-between items-center flex-1 gap-2 min-w-0">
      <div className="flex items-center gap-x-2 min-w-0">
        <Thumbnail
          src={anggota.foto}
          alt="profil"
          size={40}
          avatar={anggota.nama}
        />

        <div className="flex flex-col min-w-0">
          <Text
            size="sm"
            weight="semibold"
            variant="dark"
            title={anggota.nama}
            className="truncate"
          >
            {anggota.nama}
          </Text>

          <Text
            size="xs"
            weight="medium"
            variant="lighter"
            className="truncate"
          >
            {anggota.email || '-'}
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
