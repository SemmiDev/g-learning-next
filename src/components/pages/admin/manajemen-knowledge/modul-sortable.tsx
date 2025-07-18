import { ActionIcon, TextSpan } from '@/components/ui'
import cn from '@/utils/class-names'
import { randomString } from '@/utils/random'
import {
  SimpleTreeItemWrapper,
  SortableTree,
  TreeItemComponentProps,
  TreeItems,
} from 'dnd-kit-sortable-tree'
import {
  FlattenedItem,
  ItemChangedReason,
  TreeItem,
} from 'dnd-kit-sortable-tree/dist/types'
import { Dispatch, forwardRef, SetStateAction } from 'react'
import { BsChevronDown, BsChevronUp } from 'react-icons/bs'
import { MdAdd, MdClose, MdDragIndicator } from 'react-icons/md'

export type TreeItemDataType = {
  title?: string
  action?: 'ADD'
}

export const TreeItemAddNewItem = (): TreeItem<TreeItemDataType> => ({
  id: randomString(16),
  action: 'ADD',
  disableSorting: true,
  canHaveChildren: false,
})

type ModulSortableProps = {
  items: TreeItems<TreeItemDataType>
  setItems: Dispatch<SetStateAction<TreeItems<TreeItemDataType>>>
}

export default function ModulSortable({ items, setItems }: ModulSortableProps) {
  const handleItemsChange = (
    items: TreeItems<TreeItemDataType>,
    reason: ItemChangedReason<FlattenedItem<TreeItemDataType>>
  ) => {
    if (reason.type === 'dropped') {
      const { draggedItem, droppedToParent, draggedFromParent } = reason
      // cancel when dropped to parent on depth more than 0
      if (droppedToParent?.depth !== draggedFromParent?.depth) {
        return
      }

      const parent = items.find((item) => item.id === droppedToParent?.id)
      const parentItems = parent?.children || items

      // when dropped to last item, change to second last item
      if (
        parentItems.findIndex((item) => item.id === draggedItem.id) ===
        parentItems.length - 1
      ) {
        parentItems.splice(
          parentItems.length - 1,
          1,
          parentItems.splice(
            parentItems.length - 2,
            1,
            parentItems[parentItems.length - 1]
          )[0]
        )
        setItems([...items])

        return
      }
    }

    setItems(items)
  }

  return (
    <SortableTree
      items={items}
      onItemsChanged={handleItemsChange}
      indentationWidth={40}
      dropAnimation={null}
      sortableProps={{
        animateLayoutChanges: () => false,
      }}
      TreeItemComponent={forwardRef<
        HTMLDivElement,
        TreeItemComponentProps<TreeItemDataType>
      >((props, ref) => (
        <SimpleTreeItemWrapper
          ref={ref}
          {...props}
          manualDrag
          showDragHandle={false}
          contentClassName="!block !border-none !p-0"
        >
          {props.item.action === 'ADD' ? (
            <AddSortableItem
              {...props}
              title={props.depth ? 'Tambah Artikel' : 'Tambah Modul'}
              onClick={() => {
                console.log('aaaa')

                if (props.depth) {
                  setItems(
                    items.map((prevItem) => {
                      if (prevItem.id !== props.parent?.id) return prevItem

                      const id = randomString(16)
                      prevItem.children?.splice(
                        prevItem.children.length - 1,
                        0,
                        {
                          id: id,
                          title: `Item ${id}`,
                          canHaveChildren: false,
                        }
                      )

                      return {
                        ...prevItem,
                        children: prevItem.children
                          ? [...prevItem.children]
                          : undefined,
                      }
                    })
                  )
                } else {
                  const id = randomString(16)
                  items.splice(items.length - 1, 0, {
                    id: id,
                    title: `Item ${id}`,
                    children: [TreeItemAddNewItem()],
                    collapsed: true,
                  })
                  setItems([...items])
                }
              }}
            />
          ) : (
            <SortableItem {...props} />
          )}
        </SimpleTreeItemWrapper>
      ))}
    />
  )
}

const SortableItem = ({
  item,
  childCount,
  handleProps,
  onRemove,
  collapsed,
  clone,
}: TreeItemComponentProps<TreeItemDataType>) => {
  return (
    <div className="flex gap-2 justify-between bg-white rounded-md border border-muted px-1 py-2">
      <div
        className={cn('flex items-center gap-1 flex-1', {
          'px-4': clone,
        })}
      >
        {!clone && (
          <ActionIcon size="sm" variant="text" color="gray" {...handleProps}>
            <MdDragIndicator />
          </ActionIcon>
        )}
        <TextSpan size={clone ? 'base' : 'sm'} weight="medium">
          {item.title}
        </TextSpan>
      </div>
      {onRemove && (!childCount || childCount <= 1) && (
        <ActionIcon
          size="sm"
          color="danger"
          variant="outline-hover-colorful"
          onClick={(e) => {
            e.stopPropagation()
            onRemove()
          }}
        >
          <MdClose />
        </ActionIcon>
      )}
      {!!childCount && !clone && (
        <ActionIcon size="sm" variant="text" color="gray">
          {collapsed ? <BsChevronDown /> : <BsChevronUp />}
        </ActionIcon>
      )}
    </div>
  )
}

const AddSortableItem = ({
  title,
  onClick,
}: TreeItemComponentProps<TreeItemDataType> & {
  title: string
  onClick?: () => void
}) => {
  return (
    <button
      className="flex items-center gap-1 bg-white rounded-md border border-muted w-full px-1 py-2 active:enabled:translate-y-px"
      onClick={onClick}
    >
      <figure className="inline-flex items-center justify-center size-7">
        <MdAdd />
      </figure>
      <TextSpan size="xs" weight="medium">
        {title}
      </TextSpan>
    </button>
  )
}
