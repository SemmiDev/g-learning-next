import cn from '@/utils/class-names'

type CardSeparatorProps = {
  className?: string
}

export default function CardSeparator({ className }: CardSeparatorProps) {
  return <div className={cn('border-b border-b-muted', className)}></div>
}
