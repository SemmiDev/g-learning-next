'use client'

import cn from '@/utils/class-names'
import { Tab } from './tab'
import { Button } from 'rizzui'
import { PiCaretLeftBold, PiCaretRightBold } from 'react-icons/pi'
import { useScrollableSlider } from '@/hooks/use-scrollable-slider'

export type Item = {
  text: string
  slug?: string
  slugAlias?: string
}

export const TabGroup = ({
  className,
  path,
  items,
}: {
  className?: string
  path: string
  items: Item[]
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
      <div className="flex h-[52px] items-start overflow-hidden">
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
