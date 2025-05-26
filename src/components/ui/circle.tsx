import cn from '@/utils/class-names'

const CircleColors = {
  primary: 'bg-primary',
  success: 'bg-success',
  warning: 'bg-warning',
  danger: 'bg-danger',
  info: 'bg-info',
  gray: 'bg-gray-lighter',
  white: 'bg-white',
  black: 'bg-black',
}

export type CircleProps = {
  color?:
    | 'primary'
    | 'success'
    | 'warning'
    | 'danger'
    | 'info'
    | 'gray'
    | 'white'
    | 'black'
  className?: string
}

export default function Circle({ color = 'gray', className }: CircleProps) {
  return (
    <div
      className={cn(
        'size-2.5 rounded-full shrink-0',
        color ? CircleColors[color] : null,
        className
      )}
    ></div>
  )
}
