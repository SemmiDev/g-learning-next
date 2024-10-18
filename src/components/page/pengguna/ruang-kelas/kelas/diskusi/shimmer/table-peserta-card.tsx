import { Card, CardSeparator, Shimmer } from '@/components/ui'
import cn from '@/utils/class-names'

type TablePesertaCardShimmerProps = {
  className?: string
}

export default function TablePesertaCardShimmer({
  className,
}: TablePesertaCardShimmerProps) {
  return (
    <Card className={cn('flex flex-col p-0', className)}>
      <div className="px-2 py-3">
        <Shimmer className="h-3.5 w-1/2" />
      </div>
      <CardSeparator />
      <div className="flex justify-between p-2">
        <Shimmer className="h-8 w-1/3" />
        <Shimmer className="h-8 w-1/3" />
      </div>
      <CardSeparator />
      <table className="[&_td]:border-b [&_td]:border-b-muted">
        <tbody>
          <tr>
            <td className="p-2.5">
              <Shimmer className="h-2.5 w-2.5" />
            </td>
            <td className="p-2.5">
              <Shimmer className="h-2.5 w-24" />
            </td>
            <td className="p-2.5">
              <Shimmer className="h-2.5 w-48" />
            </td>
            <td className="p-2.5">
              <Shimmer className="h-2.5 w-8" />
            </td>
            <td></td>
          </tr>
          {[...Array(5)].map((_, idx) => (
            <tr key={idx}>
              <td className="p-2.5">
                <Shimmer className="h-2.5 w-2.5" />
              </td>
              <td className="p-2.5">
                <div key={idx} className="flex items-center space-x-2">
                  <Shimmer className="size-10" />
                  <div className="flex-1 space-y-2">
                    <Shimmer className="h-2.5 w-1/2" />
                    <Shimmer className="h-2.5 w-1/3" />
                  </div>
                </div>
              </td>
              <td className="p-2.5">
                <div className="flex-1 space-y-2">
                  <Shimmer className="h-2.5 w-1/3" />
                  <Shimmer className="h-2.5 w-1/4" />
                </div>
              </td>
              <td className="p-2.5">
                <Shimmer className="h-2.5 w-8" />
              </td>
              <td className="p-2.5">
                {idx % 2 === 0 && <Shimmer className="h-6 w-8" />}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <CardSeparator />
    </Card>
  )
}
