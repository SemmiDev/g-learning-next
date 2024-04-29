import cn from '@/utils/class-names'
import { Without } from '@/utils/without-type'
import { ReadMoreWeb, ReadMoreWebProps } from 'react-shorten'

export type ReadMoreProps = Without<ReadMoreWebProps, 'truncate'> & {
  truncate?: number
}

export default function ReadMore({
  truncate = 100,
  showMoreText = 'Lihat Selengkapnya',
  showLessText = '',
  className,
  ...props
}: ReadMoreProps) {
  return (
    <ReadMoreWeb
      truncate={truncate}
      showMoreText={showMoreText}
      showLessText={showLessText}
      className={cn(
        'text-primary font-medium hover:text-primary-dark',
        className
      )}
      {...props}
    />
  )
}
