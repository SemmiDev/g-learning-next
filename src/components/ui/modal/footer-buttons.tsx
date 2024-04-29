import { ReactNode } from 'react'
import Button, { ButtonColorProp, ButtonVariantProp } from '../button'

export default function ModalFooterButtons({
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
        <Button
          type="submit"
          variant={submitVariant}
          color={submitColor}
          className="flex-1"
          disabled={isSubmitting}
        >
          {submit}
        </Button>
      )}
      {buttons}
      {onCancel && (
        <Button
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
