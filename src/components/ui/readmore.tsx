'use client'

import cn from '@/utils/class-names'
import { useCallback, useState } from 'react'
import {
  ReadMore as RsReadMore,
  ReadMoreWebProps as RsReadMoreWebProps,
} from 'react-shorten'

export type ReadMoreProps = Omit<RsReadMoreWebProps, 'truncate'> & {
  truncate?: number
}

export const ReadMore: React.FC<ReadMoreProps> = ({
  truncate = 100,
  showMoreText = 'Lihat Selengkapnya',
  showLessText,
  className,
  style,
  children,
}) => {
  const [expanded, setExpanded] = useState(false)
  const onShowMore = useCallback(() => setExpanded(true), [])
  const onShowLess = useCallback(() => setExpanded(false), [])

  return (
    <RsReadMore
      truncate={truncate}
      expanded={expanded}
      showMore={
        <>
          {'... '}
          <button
            type="button"
            onClick={onShowMore}
            className={cn(
              'text-primary font-medium hover:text-primary-dark',
              className
            )}
            style={style}
          >
            {showMoreText}
          </button>
        </>
      }
      showLess={
        <>
          {showLessText && (
            <>
              {' '}
              <button
                type="button"
                onClick={onShowLess}
                className={cn(
                  'text-primary font-medium hover:text-primary-dark',
                  className
                )}
                style={style}
              >
                {showLessText}
              </button>
            </>
          )}
        </>
      }
    >
      {children}
    </RsReadMore>
  )
}

export default ReadMore

// export default function ReadMore({
//   truncate = 100,
//   showMoreText = 'Lihat Selengkapnya',
//   showLessText = '',
//   className,
//   ...props
// }: ReadMoreProps) {
//   return (
//     <RSReadMore
//       truncate={truncate}
//       showMoreText={showMoreText}
//       showLessText={showLessText}
//       className={cn(
//         'text-primary font-medium hover:text-primary-dark',
//         className
//       )}
//       {...props}
//     />
//   )
// }
