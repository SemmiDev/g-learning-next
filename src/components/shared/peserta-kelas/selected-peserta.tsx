import { Text, Thumbnail } from '@/components/ui'
import ActionIcon from '@/components/ui/button/action-icon'
import { LuChevronDown } from 'react-icons/lu'
import { MdClose } from 'react-icons/md'
import { PesertaKelasItemType } from './peserta-button'

type SelectedFileProps = {
  peserta: PesertaKelasItemType
  onRemove?: () => void
}

export default function SelectedPeserta({
  peserta,
  onRemove,
}: SelectedFileProps) {
  return (
    <div className="flex justify-between items-center flex-1 gap-2">
      <div className="flex items-center space-x-2">
        <Thumbnail
          src={peserta.foto}
          alt="profil"
          size={40}
          avatar={peserta.nama}
        />

        <div className="flex flex-col">
          <Text
            size="sm"
            weight="semibold"
            variant="dark"
            title={peserta.nama}
            className="truncate"
          >
            {peserta.nama}
          </Text>

          <Text
            size="xs"
            weight="medium"
            variant="lighter"
            className="truncate"
          >
            {peserta.email || '-'}
          </Text>
        </div>
      </div>

      <div className="flex items-center space-x-1">
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
