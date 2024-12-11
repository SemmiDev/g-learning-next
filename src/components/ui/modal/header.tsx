import cn from '@/utils/class-names'
import { switchCaseObject } from '@/utils/switch-case'
import { ReactNode } from 'react'
import { LuCircleHelp, LuInfo, LuTriangleAlert } from 'react-icons/lu'
import { MdOutlineClose } from 'react-icons/md'
import { Loader } from 'rizzui'
import ActionIcon from '../button/action-icon'
import Text from '../text/text'
import Title from '../text/title'

type ColorType =
  | 'dark-gray'
  | 'primary'
  | 'secondary'
  | 'info'
  | 'success'
  | 'warning'
  | 'danger'
  | 'white'
  | 'black'

type IconType = 'warning' | 'info' | 'help'

const HeaderIcon = ({
  icon,
  customIcon,
}: {
  icon?: IconType
  customIcon: ReactNode
}) => {
  const size = 20

  switch (icon) {
    case 'warning':
      return <LuTriangleAlert size={size} className="text-white" />
    case 'info':
      return <LuInfo size={size} className="text-white" />
    case 'help':
      return <LuCircleHelp size={size} className="text-white" />
    default:
      return customIcon
  }
}

export type ModalHeaderProps = {
  title: string
  isLoading?: boolean
  color?: ColorType
  icon?: IconType
  customIcon?: ReactNode
  desc?: string
  modalSize?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  rounded?: 'sm' | 'md' | 'lg' | 'xl' | 'none'
  className?: string
  closeButton?: boolean
  onClose?(): void
}

export default function ModalHeader({
  title,
  isLoading,
  color = 'dark-gray',
  icon,
  customIcon,
  desc,
  modalSize,
  rounded,
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
      : color === 'white'
      ? 'bg-white'
      : color === 'black'
      ? 'bg-black'
      : 'bg-gray-dark'

  const classRounded = switchCaseObject(
    rounded,
    {
      none: '',
      sm: 'rounded-t-lg',
      lg: 'rounded-t-2xl',
      xl: 'rounded-t-3xl',
    },
    'rounded-t-xl'
  )

  return (
    <div
      className={cn(
        'modal-header flex justify-between p-3',
        bgColor,
        color === 'white' ? 'border-b border-muted' : null,
        modalSize !== 'full' ? classRounded : null,
        className
      )}
    >
      <div>
        <div className="flex space-x-2">
          <Title
            as="h4"
            weight="semibold"
            className={cn(
              'modal-title',
              color === 'white' ? 'text-gray-dark' : 'text-white'
            )}
          >
            {title}
          </Title>
          {isLoading && (
            <Loader
              size="sm"
              variant="pulse"
              className={color === 'white' ? 'text-gray' : 'text-white'}
            />
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
      <div className="flex items-center self-start gap-x-2">
        <HeaderIcon icon={icon} customIcon={customIcon} />
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
