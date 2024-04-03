import type { Item } from './tab-group'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Text from './text'

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
      className={clsx(
        'group relative cursor-pointer whitespace-nowrap py-2.5 px-1 text-gray-dark before:absolute before:bottom-0 before:left-0 before:z-[1] before:h-0.5 before:bg-primary before:transition-all',
        isActive
          ? 'text-primary before:visible before:w-full before:opacity-100'
          : 'before:invisible before:w-0 before:opacity-0'
      )}
    >
      <Text
        as="span"
        size="sm"
        weight="semibold"
        className="inline-flex rounded-md px-2.5 py-1.5 transition-all duration-200 group-hover:bg-gray-100/70"
      >
        {item.text}
      </Text>
    </Link>
  )
}
