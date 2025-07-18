import cn from '@/utils/class-names'
import { randomString } from '@/utils/random'
import { TreeItems } from 'dnd-kit-sortable-tree'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import { TreeItemAddNewItem, TreeItemDataType } from './modul-sortable'

const ModulSortable = dynamic(() => import('./modul-sortable'), { ssr: false })

const initialTreeData: TreeItems<TreeItemDataType> = [
  {
    id: randomString(16),
    title: 'Item 1',
    children: [
      { id: randomString(16), title: 'Item 4', canHaveChildren: false },
      { id: randomString(16), title: 'Item 5', canHaveChildren: false },
      TreeItemAddNewItem(),
    ],
  },
  {
    id: randomString(16),
    title: 'Item 2',
    children: [TreeItemAddNewItem()],
    collapsed: true,
  },
  {
    id: randomString(16),
    title: 'Item 3',
    children: [TreeItemAddNewItem()],
    collapsed: true,
  },
  TreeItemAddNewItem(),
]

type ModulSectionProps = {
  className?: string
}

export default function ModulSection({ className }: ModulSectionProps) {
  const [items, setItems] =
    useState<TreeItems<TreeItemDataType>>(initialTreeData)

  return (
    <div className={cn('grid gap-2', className)}>
      <ModulSortable items={items} setItems={setItems} />
    </div>
  )
}
