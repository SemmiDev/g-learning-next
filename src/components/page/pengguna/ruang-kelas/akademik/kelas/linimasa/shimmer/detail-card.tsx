import { Card, CardSeparator, Shimmer } from '@/components/ui'
import cn from '@/utils/class-names'

type DetailCardShimmerProps = {
  className?: string
}

export default function DetailCardShimmer({
  className,
}: DetailCardShimmerProps) {
  return (
    <Card className={cn('flex flex-col p-0', className)}>
      <div className="flex flex-col space-y-2 p-4">
        <Shimmer className="h-3.5 w-1/2" />
        <div className="flex flex-col space-y-2">
          {[...Array(12)].map((_, idx) => (
            <Shimmer
              key={idx}
              className={cn(
                'h-2.5',
                (idx + 1) % 6 === 0 ? 'w-1/3' : 'w-full',
                idx % 6 === 0 && '!mt-4'
              )}
            />
          ))}
        </div>
      </div>
      <CardSeparator />
      <div className="px-4 p-2">
        <Shimmer className="h-8 w-full" />
      </div>
    </Card>
  )
}
