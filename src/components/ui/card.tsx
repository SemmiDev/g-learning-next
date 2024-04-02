import cn from '@/utils/class-names'

export default function Card({
  children,
  className,
}: {
  className?: string
  children?: React.ReactNode
}) {
  return (
    <div
      className={cn(
        'bg-white border border-gray-100 shadow rounded-lg overflow-clip p-2',
        className
      )}
    >
      {children}
    </div>
  )
}
