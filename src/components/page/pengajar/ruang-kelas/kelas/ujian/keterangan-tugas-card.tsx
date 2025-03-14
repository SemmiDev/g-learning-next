import { Card, Shimmer, Title } from '@/components/ui'
import { SanitizeHTML } from '@/components/ui/sanitize-html'
import cn from '@/utils/class-names'

type KeteranganTugasCardProps = {
  className?: string
}

export default function KeteranganTugasCard({
  className,
}: KeteranganTugasCardProps) {
  if (false) return <ShimmerCard className={className} />

  return (
    <Card className={cn('flex flex-col', className)}>
      <Title as="h4">Judul Quiz</Title>
      <SanitizeHTML
        html="Keterangan singkat terkait quiz"
        className="font-medium text-gray-lighter"
      />
    </Card>
  )
}

function ShimmerCard({ className }: { className?: string }) {
  return (
    <Card className={cn('flex flex-col gap-y-3 py-3', className)}>
      <Shimmer className="h-4 w-1/6" />
      <Shimmer className="h-3 w-1/2" />
    </Card>
  )
}
