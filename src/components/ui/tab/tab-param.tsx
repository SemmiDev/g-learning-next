'use client'

import cn from '@/utils/class-names'
import { useQueryState } from 'nuqs'
import Text from '../text/text'
import { TabItem } from './tab'

type TabParamProps = {
  item: TabItem
}

export default function Tab({ item }: TabParamProps) {
  const [tab, setTab] = useQueryState('tab')

  const isActive =
    tab === item.slug ||
    (!!item.slugAlias && (tab === item.slugAlias || tab === null))

  return (
    <div
      className={cn(
        'group relative cursor-pointer whitespace-nowrap py-2.5 px-1 text-gray-dark before:absolute before:bottom-0 before:left-0 before:z-[1] before:h-0.5 before:bg-primary before:transition-all',
        isActive
          ? 'text-primary before:visible before:w-full before:opacity-100'
          : 'before:invisible before:w-0 before:opacity-0'
      )}
      onClick={() => setTab(item.slug ?? item.slugAlias ?? null)}
    >
      <Text
        as="span"
        size="sm"
        weight="semibold"
        className="inline-flex rounded-md px-2.5 py-1.5 transition-all duration-200 group-hover:bg-muted/40"
      >
        {item.text}
      </Text>
    </div>
  )
}
