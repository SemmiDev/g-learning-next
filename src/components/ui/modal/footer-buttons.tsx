import cn from '@/utils/class-names'
import { ReactNode } from 'react'
import Button, { ButtonColors, ButtonVariants } from '../button/button'
import ButtonSubmit from '../button/submit'

type ModalFooterButtonsProps = {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  submit?: ReactNode
  submitColor?: ButtonColors
  submitVariant?: ButtonVariants
  submitClassName?: string
  isSubmitting?: boolean
  children?: ReactNode
  cancel?: string
  cancelColor?: ButtonColors
  cancelVariant?: ButtonVariants
  cancelClassName?: string
  onCancel?(): void
  disabled?: boolean
  borderTop?: boolean
  className?: string
}

export default function ModalFooterButtons({
  size,
  submit,
  submitColor = 'primary',
  submitVariant = 'solid',
  isSubmitting = false,
  submitClassName,
  children,
  cancel = 'Batal',
  cancelColor = 'primary',
  cancelVariant = 'outline',
  cancelClassName,
  onCancel,
  borderTop,
  disabled = false,

  className,
}: ModalFooterButtonsProps) {
  return (
    <div
      className={cn(
        'flex gap-2 p-3',
        { 'border-t border-t-muted': borderTop },
        className
      )}
    >
      {submit && (
        <div className="flex-1">
          <ButtonSubmit
            type="submit"
            size={size}
            variant={submitVariant}
            color={submitColor}
            className={cn('w-full', submitClassName)}
            isSubmitting={isSubmitting}
            disabled={disabled}
          >
            {submit}
          </ButtonSubmit>
        </div>
      )}
      {children}
      {onCancel && (
        <div className="flex-1">
          <Button
            size={size}
            variant={cancelVariant}
            color={cancelColor}
            className={cn('w-full', cancelClassName)}
            onClick={onCancel}
            disabled={disabled}
          >
            {cancel}
          </Button>
        </div>
      )}
    </div>
  )
}
