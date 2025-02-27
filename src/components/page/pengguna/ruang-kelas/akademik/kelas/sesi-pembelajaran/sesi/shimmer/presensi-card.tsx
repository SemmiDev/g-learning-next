import { Card, CardSeparator, Shimmer } from '@/components/ui'
import cn from '@/utils/class-names'

type PresensiCardShimmerProps = {
  className?: string
}

export default function PresensiCardShimmer({
  className,
}: PresensiCardShimmerProps) {
  return (
    <Card className={cn('flex flex-col p-0', className)}>
      <div className="px-2 py-3.5">
        <Shimmer className="h-4 w-1/2" />
      </div>
      <CardSeparator />
      <div className="flex flex-col divide-y">
        {[...Array(5)].map((_, idx) => (
          <div key={idx} className="flex items-center space-x-2 px-2 py-4">
            <Shimmer className="size-[2.375rem]" />
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
