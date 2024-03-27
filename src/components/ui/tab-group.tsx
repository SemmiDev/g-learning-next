import cn from '@/utils/class-names'
import { Tab } from './tab'

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
  return (
    <div className={cn('flex flex-wrap', className)}>
      {items.map((item) => (
        <Tab key={path + item.slug} item={item} path={path} />
      ))}
    </div>
  )
}
