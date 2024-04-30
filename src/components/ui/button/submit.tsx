import { Loader, LoaderTypes } from 'rizzui'
import Button, { ButtonProps } from './button'

export type ButtonSubmitProps = ButtonProps & {
  isSubmitting?: boolean
  loaderSize?: LoaderTypes['size']
}

export default function ButtonSubmit({
  isSubmitting = false,
  loaderSize = 'sm',
  disabled,
  children,
  ...props
}: ButtonSubmitProps) {
  return (
    <Button disabled={isSubmitting || disabled} {...props}>
      {isSubmitting && (
        <Loader size={loaderSize} variant="spinner" className="mr-2" />
      )}
      {children}
    </Button>
  )
}
