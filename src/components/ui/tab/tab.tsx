'use client'

import cn from '@/utils/class-names'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Text from '../text/text'

export type TabItem = {
  text: string
  slug?: string
  slugAlias?: string
}

type TabProps = {
  path: string
  item: TabItem
}

export default function Tab({ path, item }: TabProps) {
  const pathname = usePathname()

  const link = item.slug ? path + '/' + item.slug : path
  const linkAlias = item.slugAlias ? path + '/' + item.slugAlias : null

  const isActive =
    (link === path && pathname === link) ||
    (link !== path && pathname.startsWith(link)) ||
    (linkAlias !== null && pathname.startsWith(linkAlias))

  return (
    <div
      className={cn(
        'group relative cursor-pointer whitespace-nowrap py-2.5 px-1 text-gray-dark before:absolute before:bottom-0 before:left-0 before:z-[1] before:h-0.5 before:bg-primary before:transition-all',
        isActive
          ? 'text-primary before:visible before:w-full before:opacity-100'
          : 'before:invisible before:w-0 before:opacity-0'
      )}
    >
      <Link href={link}>
        <Text
          as="span"
          size="sm"
          weight="semibold"
          className="inline-flex rounded-md px-2.5 py-1.5 transition-all duration-200 group-hover:bg-muted/40"
        >
          {item.text}
        </Text>
      </Link>
    </div>
  )
}
