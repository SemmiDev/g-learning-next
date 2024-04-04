import { ActionIcon } from 'rizzui'
import Text from '../text'
import Title from '../title'
import { MdOutlineClose } from 'react-icons/md'
import cn from '@/utils/class-names'

export default function ModalHeader({
  title,
  desc,
  className,
  onClose,
}: {
  title: string
  desc: string
  className?: string
  onClose(): void
}) {
  return (
    <div className={cn('flex justify-between bg-black p-3', className)}>
      <div>
        <Title as="h3" className="text-white mb-1">
          {title}
        </Title>
        <Text size="sm" color="gray" variant="lighter">
          {desc}
        </Text>
      </div>
      <ActionIcon
        size="sm"
        variant="text"
        onClick={onClose}
        className="text-white"
      >
        <MdOutlineClose size={18} />
      </ActionIcon>
    </div>
  )
}
