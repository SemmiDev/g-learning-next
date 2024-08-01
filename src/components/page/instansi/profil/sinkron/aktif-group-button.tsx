import { Button } from '@/components/ui'
import cn from '@/utils/class-names'
import { ReactNode } from 'react'

type AktifGroupButtonProps = {
  active?: boolean
  onActivate?(): void
  onDeactivate?(): void
}

export default function AktifGroupButton({
  active,
  onActivate,
  onDeactivate,
}: AktifGroupButtonProps) {
  return (
    <div className="flex p-2">
      <CustomButton
        solid={active}
        position="left"
        onClick={() => onActivate && !active && onActivate()}
      >
        Aktif
      </CustomButton>
      <CustomButton
        solid={!active}
        position="right"
        onClick={() => onDeactivate && active && onDeactivate()}
      >
        Tidak Aktif
      </CustomButton>
    </div>
  )
}

function CustomButton({
  solid,
  position = 'left',
  children,
  onClick,
}: {
  solid?: boolean
  position?: 'left' | 'right'
  children: ReactNode
  onClick?(): void
}) {
  return (
    <Button
      variant={solid ? 'solid' : 'outline'}
      color="success"
      className={cn(
        'flex-1',
        position === 'left' ? 'rounded-r-none' : 'rounded-l-none',
        {
          'border-success hover:border-success-dark': !solid,
        }
      )}
      onClick={onClick}
    >
      {children}
    </Button>
  )
}
