import { Text } from '@/components/ui'
import cn from '@/utils/class-names'
import { ComponentType } from 'react'
import { IconBaseProps } from 'react-icons/lib'

export default function ProfileItem({
  Icon,
  label,
  value,
  color = 'blue',
  variant = 'solid',
  className,
}: {
  Icon: ComponentType<IconBaseProps>
  label: string
  value: string
  color?: 'blue' | 'green' | 'red'
  variant?: 'solid' | 'outline'
  className?: string
}) {
  const colors = {
    blue: '#3B82F6',
    green: '#00B929',
    red: '#F1416C',
  }

  return (
    <div
      className={cn(
        'flex flex-col rounded-md px-3 py-2',
        {
          'border border-dashed border-gray-200': variant === 'outline',
        },
        className
      )}
      style={{
        backgroundColor: variant === 'solid' ? colors[color] : undefined,
      }}
    >
      <Icon
        size={16}
        className="mb-1"
        style={{
          color: variant === 'solid' ? 'white' : colors[color],
        }}
      />
      <Text
        size="sm"
        weight="medium"
        className={cn(
          'mb-1',
          variant === 'solid' ? 'text-white' : 'text-gray-lighter'
        )}
      >
        {label.split('\n').map((val, idx) => (
          <span key={idx}>
            {val}
            <br />
          </span>
        ))}
      </Text>
      <Text
        size="1.5xl"
        weight="semibold"
        variant="dark"
        className={cn(variant === 'solid' ? 'text-white' : 'text-gray-dark')}
      >
        {value}
      </Text>
    </div>
  )
}
