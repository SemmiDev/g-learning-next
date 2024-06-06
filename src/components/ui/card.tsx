import cn from '@/utils/class-names'

export type CardProps = {
  shadow?: 'normal' | 'sm' | 'md' | 'lg' | 'xl'
  rounded?: 'normal' | 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  children?: React.ReactNode
}

export default function Card({
  shadow = 'normal',
  rounded = 'md',
  className,
  children,
}: CardProps) {
  return (
    <div
      className={cn(
        'bg-white border border-gray-100 rounded-md overflow-clip p-2',
        shadow == 'normal' ? 'shadow' : `shadow-${shadow}`,
        rounded == 'normal' ? 'rounded' : `rounded-${shadow}`,
        className
      )}
    >
      {children}
    </div>
  )
}
