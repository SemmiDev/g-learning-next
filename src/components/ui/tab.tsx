'use client'

import type { Item } from './tab-group'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const Tab = ({ path, item }: { path: string; item: Item }) => {
  const pathname = usePathname()

  const link = item.slug ? path + '/' + item.slug : path
  const linkAlias = item.slugAlias ? path + '/' + item.slugAlias : null

  const isActive =
    (link === path && pathname === link) ||
    (link !== path && pathname.startsWith(link)) ||
    (linkAlias !== null && pathname.startsWith(linkAlias))

  return (
    <Link
      href={link}
      className={clsx('text-sm font-semibold px-4 py-3', {
        'text-primary border-b-2 border-b-primary': isActive,
      })}
    >
      {item.text}
    </Link>
  )
}
