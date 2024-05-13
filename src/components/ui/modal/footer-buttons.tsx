import { ReactNode } from 'react'
import Button, { ButtonColorProp, ButtonVariantProp } from '../button/button'
import ButtonSubmit from '../button/submit'

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
}: {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  submit?: string
  submitColor?: ButtonColorProp
  submitVariant?: ButtonVariantProp
  isSubmitting?: boolean
  buttons?: ReactNode
  cancel?: string
  cancelColor?: ButtonColorProp
  cancelVariant?: ButtonVariantProp
  onCancel?(): void
}) {
  return (
    <div className="flex gap-2 p-3">
      {submit && (
        <ButtonSubmit
          type="submit"
          size={size}
          variant={submitVariant}
          color={submitColor}
          className="flex-1"
          isSubmitting={isSubmitting}
        >
          {submit}
        </ButtonSubmit>
      )}
      {buttons}
      {onCancel && (
        <Button
          size={size}
          variant={cancelVariant}
          color={cancelColor}
          className="flex-1"
          onClick={onCancel}
        >
          {cancel}
        </Button>
      )}
    </div>
  )
}
