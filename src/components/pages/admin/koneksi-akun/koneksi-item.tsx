import { Button, Card, ContentLoader, Text } from '@/components/ui'
import cn from '@/utils/class-names'
import { ReactNode } from 'react'

type KoneksiItemProps = {
  title: string
  icon: ReactNode
  isLoading?: boolean
  connected?: boolean
  onConnect?: () => void
  onDisconnect?: () => void
  className?: string
}

export default function KoneksiItem({
  title,
  icon,
  isLoading,
  connected,
  onConnect,
  onDisconnect,
  className,
}: KoneksiItemProps) {
  return (
    <Card
      className={cn(
        'flex justify-between items-center gap-2 px-5 py-4',
        className
      )}
    >
      <div className="flex items-center gap-2 min-h-8">
        {icon}
        <Text weight="semibold">{title}</Text>
      </div>
      {isLoading ? (
        <ContentLoader size="sm" variant="pulse" className="mr-7" />
      ) : !connected ? (
        <Button size="sm" onClick={onConnect}>
          Hubungkan
        </Button>
      ) : (
        <Button
          size="sm"
          variant="outline"
          color="danger"
          onClick={onDisconnect}
          className="text-danger"
        >
          Putuskan
        </Button>
      )}
    </Card>
  )
}
