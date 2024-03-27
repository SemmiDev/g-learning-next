import cn from '@/utils/class-names'
import { Button, Text } from 'rizzui'

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
    <button className="flex flex-col items-center">
      <div
        className={cn(
          'flex justify-center items-center rounded p-4',
          `btn-item-${color}`
        )}
      >
        {children}
      </div>
      <Text className="text-gray-dark text-xs font-semibold mt-1">{title}</Text>
    </button>
  )
}
