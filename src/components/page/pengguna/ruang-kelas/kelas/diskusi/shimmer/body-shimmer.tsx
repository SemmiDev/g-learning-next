import { Card, CardSeparator, Shimmer } from '@/components/ui'
import cn from '@/utils/class-names'

export default function BodyShimmer() {
  return (
    <div className="flex flex-col-reverse gap-x-4 gap-y-6 mt-8 lg:flex-row">
      <div className="flex flex-col space-y-6 lg:w-7/12">
        <HeaderShimmer />
        {[...Array(2)].map((_, idx) => (
          <CardShimmer key={idx} />
        ))}
      </div>
    </div>
  )
}

function HeaderShimmer() {
  return (
    <Card className="px-2 py-3">
      <Shimmer className="h-3 w-1/4" />
      <div className="flex gap-5 mt-4">
        {[...Array(3)].map((_, idx) => (
          <div key={idx} className="flex flex-col items-center space-y-1">
            <Shimmer className="size-16" />
            <Shimmer className="h-2 w-5/12" />
          </div>
        ))}
      </div>
    </Card>
  )
}

function CardShimmer() {
  return (
    <Card className="flex flex-col p-0">
      <div className="flex items-center space-x-3 px-4 py-2">
        <Shimmer className="size-12" />
        <div className="flex flex-col space-y-2 flex-1">
          <Shimmer className="h-3 w-1/4" />
          <Shimmer className="h-2 w-1/6" />
        </div>
      </div>
      <CardSeparator />
      <div className="flex flex-col space-y-3 p-4">
        <Shimmer className="h-3.5 w-1/2" />
        <div className="flex flex-col space-y-2">
          {[...Array(2)].map((_, idx) => (
            <Shimmer
              key={idx}
              className={cn('h-2.5', (idx + 1) % 2 === 0 ? 'w-1/3' : 'w-full')}
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
