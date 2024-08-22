import cn from '@/utils/class-names'
import { ReactNode } from 'react'
import { LuAlertTriangle, LuHelpCircle, LuInfo } from 'react-icons/lu'
import { MdOutlineClose } from 'react-icons/md'
import ActionIcon from '../button/action-icon'
import Text from '../text/text'
import Title from '../text/title'
import { Loader } from 'rizzui'

type ColorType =
  | 'dark-gray'
  | 'primary'
  | 'secondary'
  | 'info'
  | 'success'
  | 'warning'
  | 'danger'
  | 'black'

type IconType = 'warning' | 'info' | 'help' | ReactNode

const HeaderIcon = ({ icon }: { icon?: IconType }) => {
  const size = 20

  switch (icon) {
    case 'warning':
      return <LuAlertTriangle size={size} className="text-white" />
    case 'info':
      return <LuInfo size={size} className="text-white" />
    case 'help':
      return <LuHelpCircle size={size} className="text-white" />
    default:
      return icon
  }
}

export type ModalHeaderProps = {
  title: string
  isLoading?: boolean
  color?: ColorType
  icon?: IconType
  desc?: string
  className?: string
  closeButton?: boolean
  onClose?(): void
}

export default function ModalHeader({
  title,
  isLoading,
  color = 'dark-gray',
  icon,
  desc,
  className,
  closeButton,
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
        <div className="flex space-x-2">
          <Title as="h4" weight="semibold" className="modal-title text-white">
            {title}
          </Title>
          {isLoading && (
            <Loader size="sm" variant="pulse" className="text-white" />
          )}
        </div>
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
      <div className="flex items-center space-x-2">
        <HeaderIcon icon={icon} />
        {closeButton && onClose && (
          <ActionIcon
            size="sm"
            variant="text"
            color="gray"
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
