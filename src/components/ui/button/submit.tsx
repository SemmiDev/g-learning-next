import { forwardRef } from 'react'
import Button, { ButtonProps } from './button'
import Loader, { LoaderProps } from '../loader/loader'

export type ButtonSubmitProps = Omit<ButtonProps, 'isLoading'> & {
  isSubmitting?: boolean
  showLoader?: boolean
  loaderSize?: LoaderProps['size']
}

export default forwardRef<HTMLButtonElement, ButtonSubmitProps>(
  function ButtonSubmit(
    {
      type = 'submit',
      size = 'md',
      isSubmitting = false,
      showLoader = true,
      loaderSize,
      disabled,
      children,
      ...props
    }: ButtonSubmitProps,
    ref
  ) {
    loaderSize =
      loaderSize ?? size === 'sm'
        ? '2xs'
        : size === 'lg'
        ? 'sm'
        : size === 'xl'
        ? 'md'
        : 'xs'

    return (
      <Button
        ref={ref}
        type={type}
        size={size}
        disabled={isSubmitting || disabled}
        {...props}
      >
        {showLoader && isSubmitting && (
          <Loader size={loaderSize} variant="spinner" className="mr-2" />
        )}
        {children}
      </Button>
    )
  }
)
