'use client'

import { useScrollableSlider } from '@/hooks/use-scrollable-slider'
import cn from '@/utils/class-names'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { PiCaretLeftBold, PiCaretRightBold } from 'react-icons/pi'
import { Button } from 'rizzui'
import Text from './text/text'

type TabItem = {
  text: string
  slug?: string
  slugAlias?: string
}

export const Tab = ({ path, item }: { path: string; item: TabItem }) => {
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

export const TabGroup = ({
  className,
  path,
  items,
}: {
  className?: string
  path: string
  items: TabItem[]
}) => {
  const {
    sliderEl,
    sliderPrevBtn,
    sliderNextBtn,
    scrollToTheRight,
    scrollToTheLeft,
  } = useScrollableSlider()

  return (
    <div
      className={cn(
        'relative flex items-center overflow-hidden pr-5',
        className
      )}
    >
      <Button
        title="Prev"
        variant="text"
        ref={sliderPrevBtn}
        onClick={() => scrollToTheLeft()}
        className="!absolute left-0 top-0.5 z-10 !h-[calc(100%-4px)] w-8 !justify-start bg-gradient-to-r from-white via-white to-transparent px-0 text-gray-500 hover:text-black lg:hidden dark:from-gray-50 dark:via-gray-50"
      >
        <PiCaretLeftBold className="w-5" />
      </Button>
      <div className="flex items-start overflow-hidden">
        <div
          className="flex w-full overflow-x-auto scroll-smooth"
          ref={sliderEl}
        >
          {items.map((item) => (
            <Tab key={path + item.slug} item={item} path={path} />
          ))}
        </div>
      </div>
      <Button
        title="Next"
        variant="text"
        ref={sliderNextBtn}
        onClick={() => scrollToTheRight()}
        className="!absolute right-0 top-0.5 z-10 !h-[calc(100%-4px)] w-8 !justify-end bg-gradient-to-l from-white via-white to-transparent px-0 text-gray-500 hover:text-black lg:hidden dark:from-gray-50 dark:via-gray-50"
      >
        <PiCaretRightBold className="w-5" />
      </Button>
    </div>
  )
}
