import cn from '@/utils/class-names'
import { MdOutlineClose } from 'react-icons/md'
import Text from '../text/text'
import Title from '../text/title'
import ActionIcon from '../button/action-icon'

export type ModalHeaderProps = {
  title: string
  color?:
    | 'dark-gray'
    | 'primary'
    | 'secondary'
    | 'info'
    | 'success'
    | 'warning'
    | 'danger'
    | 'black'
  desc?: string
  className?: string
  onClose?(): void
}

export default function ModalHeader({
  title,
  color = 'dark-gray',
  desc,
  className,
  onClose,
}: ModalHeaderProps) {
  const bgColor =
    color === 'primary'
      ? 'bg-primary-dark'
      : color === 'secondary'
      ? 'bg-secondary-dark'
      : color === 'info'
      ? 'bg-info-dark'
      : color === 'success'
      ? 'bg-success-dark'
      : color === 'warning'
      ? 'bg-warning-dark'
      : color === 'danger'
      ? 'bg-danger-dark'
      : color === 'black'
      ? 'bg-black'
      : 'bg-gray-dark'

  return (
    <div
      className={cn(
        'modal-header flex justify-between p-3',
        bgColor,
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
      <div>
        {onClose && (
          <ActionIcon
            size="sm"
            variant="text"
            color="secondary"
            onClick={onClose}
            className="text-white"
          >
            <MdOutlineClose size={18} />
          </ActionIcon>
        )}
      </div>
    </div>
  )
}
