import { Placement } from '@floating-ui/react'
import { ReactNode } from 'react'
import { Tooltip, TooltipProps } from 'rizzui'
import Button, { ButtonProps } from './button'

export type ButtonTooltipProps = ButtonProps & {
  tooltip: ReactNode
  tooltipSize?: 'sm' | 'md' | 'lg' | 'xl'
  tooltipPosition?: Placement
  tooltipColor?: TooltipProps['color']
}

export default function ButtonTooltip({
  tooltip,
  tooltipSize = 'sm',
  tooltipPosition = 'top',
  tooltipColor = 'invert',
  ...props
}: ButtonTooltipProps) {
  return (
    <Tooltip
      content={tooltip}
      size={tooltipSize}
      placement={tooltipPosition}
      color={tooltipColor}
    >
      <Button {...props} />
    </Tooltip>
  )
}
