import { Text } from '@/components/ui'
import cn from '@/utils/class-names'

export default function ButtonIcon({
  title,
  color,
  children,
}: {
  title: string
  color: 'green' | 'violet' | 'blue' | 'red' | 'indigo'
  children: React.ReactNode
}) {
  return (
    <button className="flex flex-col items-center active:enabled:translate-y-px">
      <div
        className={cn(
          'flex justify-center items-center rounded p-4',
          `btn-item-${color}`
        )}
      >
        {children}
      </div>
      <Text size="sm" weight="semibold" variant="dark" className="mt-1">
        {title}
      </Text>
    </button>
  )
}
