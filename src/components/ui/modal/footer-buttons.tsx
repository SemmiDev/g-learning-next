import { ReactNode } from 'react'
import Button, { ButtonColors, ButtonVariants } from '../button/button'
import ButtonSubmit from '../button/submit'
import cn from '@/utils/class-names'

type ModalFooterButtonsProps = {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  submit?: string
  submitColor?: ButtonColors
  submitVariant?: ButtonVariants
  isSubmitting?: boolean
  buttons?: ReactNode
  cancel?: string
  cancelColor?: ButtonColors
  cancelVariant?: ButtonVariants
  onCancel?(): void
  className?: string
}

export default function ModalFooterButtons({
  size,
  submit,
  submitColor = 'primary',
  submitVariant = 'solid',
  isSubmitting = false,
  buttons,
  cancel = 'Batal',
  cancelColor = 'primary',
  cancelVariant = 'outline',
  onCancel,
  className,
}: ModalFooterButtonsProps) {
  return (
    <div className={cn('flex gap-2 p-3', className)}>
      {submit && (
        <div className="flex-1">
          <ButtonSubmit
            type="submit"
            size={size}
            variant={submitVariant}
            color={submitColor}
            className="w-full"
            isSubmitting={isSubmitting}
          >
            {submit}
          </ButtonSubmit>
        </div>
      )}
      {buttons}
      {onCancel && (
        <div className="flex-1">
          <Button
            size={size}
            variant={cancelVariant}
            color={cancelColor}
            className="w-full"
            onClick={onCancel}
          >
            {cancel}
          </Button>
        </div>
      )}
    </div>
  )
}
