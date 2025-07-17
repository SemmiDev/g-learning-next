import { Card } from '@/components/ui'
import cn from '@/utils/class-names'

type DetailCardProps = {
  className?: string
}

export default function DetailCard({ className }: DetailCardProps) {
  return (
    <Card className={cn(className)}>
      <div className="min-h-[400px]"></div>
    </Card>
  )
}
