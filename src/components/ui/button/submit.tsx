import { forwardRef } from 'react'
import { Loader, LoaderTypes } from 'rizzui'
import Button, { ButtonProps } from './button'

export type ButtonSubmitProps = Omit<ButtonProps, 'isLoading'> & {
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
