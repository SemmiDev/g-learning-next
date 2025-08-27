import { Placement } from '@floating-ui/react'
import { ReactNode } from 'react'
import { Tooltip, TooltipProps } from 'rizzui'
import ActionIcon, { ActionIconProps } from './action-icon'

export type ActionIconTooltipProps = ActionIconProps & {
  tooltip: ReactNode
  tooltipSize?: 'sm' | 'md' | 'lg' | 'xl'
  tooltipPosition?: Placement
  tooltipColor?: TooltipProps['color']
}

export default function ActionIconTooltip({
  tooltip,
  tooltipSize = 'sm',
  tooltipPosition = 'top',
  tooltipColor = 'invert',
  ...props
}: ActionIconTooltipProps) {
  return (
    <Tooltip
      content={tooltip}
      size={tooltipSize}
      placement={tooltipPosition}
      color={tooltipColor}
    >
      <ActionIcon {...props} />
    </Tooltip>
  )
}
