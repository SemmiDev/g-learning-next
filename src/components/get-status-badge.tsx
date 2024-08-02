'use client'

import cn from '@/utils/class-names'
import { Badge } from './ui'

const classes = {
  base: 'text-xs px-2 duration-200 py-0.5 font-normal capitalize border tracking-wider font-lexend bg-opacity-50 dark:bg-opacity-40 dark:text-opacity-90 dark:text-gray-dark dark:backdrop-blur',
  color: {
    success:
      'border-success bg-success-lighter text-success-dark dark:bg-success',
    danger: 'border-danger bg-danger-lighter text-danger-dark dark:bg-danger',
  },
  layout: {
    helium: {
      base: 'bg-opacity-40 text-opacity-90 text-gray-0 dark:text-gray-dark backdrop-blur group-hover:bg-opacity-100 group-hover:text-opacity-100',
      success: 'bg-success',
      danger: 'bg-danger',
    },
  },
}

export default function StatusBadge({ status }: { status: string }) {
  const colorStatus = status?.toLowerCase() === 'new' ? 'danger' : 'success'

  return (
    <Badge
      variant="flat"
      size="sm"
      color={colorStatus}
      className={cn(
        classes.base,
        classes.color[colorStatus],
        classes.layout.helium.base,
        classes.layout.helium[colorStatus]
      )}
    >
      {status}
    </Badge>
  )
}
