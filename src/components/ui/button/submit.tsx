import { Loader, LoaderTypes } from 'rizzui'
import Button, { ButtonProps } from './button'
import { forwardRef } from 'react'

export type ButtonSubmitProps = ButtonProps & {
  isSubmitting?: boolean
  loaderSize?: LoaderTypes['size']
}

export default forwardRef<HTMLButtonElement, ButtonSubmitProps>(
  function ButtonSubmit(
    {
      type = 'submit',
      isSubmitting = false,
      loaderSize = 'sm',
      disabled,
      children,
      ...props
    }: ButtonSubmitProps,
    ref
  ) {
    return (
      <Button
        ref={ref}
        type={type}
        disabled={isSubmitting || disabled}
        {...props}
      >
        {isSubmitting && (
          <Loader size={loaderSize} variant="spinner" className="mr-2" />
        )}
        {children}
      </Button>
    )
  }
)
