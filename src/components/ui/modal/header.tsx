import cn from '@/utils/class-names'
import { MdOutlineClose } from 'react-icons/md'
import { ActionIcon } from 'rizzui'
import Text from '../text/text'
import Title from '../text/title'

export default function ModalHeader({
  title,
  desc,
  className,
  onClose,
}: {
  title: string
  desc?: string
  className?: string
  onClose?(): void
}) {
  return (
    <div
      className={cn(
        'modal-header flex justify-between bg-black p-3',
        className
      )}
    >
      <div>
        <Title as="h4" weight="semibold" className="modal-title text-white">
          {title}
        </Title>
        {desc && (
          <Text
            size="sm"
            weight="medium"
            color="gray"
            variant="lighter"
            className="modal-desc mt-1"
          >
            {desc}
          </Text>
        )}
      </div>
      {onClose && (
        <ActionIcon
          size="sm"
          variant="text"
          onClick={onClose}
          className="text-white"
        >
          <MdOutlineClose size={18} />
        </ActionIcon>
      )}
    </div>
  )
}
