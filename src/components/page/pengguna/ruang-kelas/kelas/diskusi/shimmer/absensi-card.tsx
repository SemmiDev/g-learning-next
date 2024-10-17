import { Card, CardSeparator, Shimmer } from '@/components/ui'
import cn from '@/utils/class-names'

type AbsensiCardShimmerProps = {
  className?: string
}

export default function AbsensiCardShimmer({
  className,
}: AbsensiCardShimmerProps) {
  return (
    <Card className={cn('flex flex-col p-0', className)}>
      <div className="px-2 py-3">
        <Shimmer className="h-3.5 w-1/2" />
      </div>
      <CardSeparator />
      <div className="flex flex-col divide-y">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center space-x-2 p-2">
            <Shimmer className="size-10" />
            <div className="flex-1 space-y-2">
              <Shimmer className="h-2.5 w-1/2" />
              <Shimmer className="h-2.5 w-1/3" />
            </div>
          </div>
        ))}
      </div>
      <CardSeparator />
    </Card>
  )
}
