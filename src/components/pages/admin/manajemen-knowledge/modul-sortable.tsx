import { ActionIcon } from '@/components/ui'
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
} from 'dnd-kit-sortable-tree/dist/types'
import { Dispatch, forwardRef, SetStateAction } from 'react'
import { BsChevronDown, BsChevronUp } from 'react-icons/bs'
import { MdAdd, MdClose, MdDragIndicator } from 'react-icons/md'

export type TreeItemDataType = {
  title?: string
  action?: 'ADD'
}

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
      // cancel when dropped to parent on depth more than 0
      if (reason.droppedToParent?.depth !== reason.draggedFromParent?.depth) {
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
          contentClassName={cn('!block !border-none !p-0', {
            // '[&>*]:bg-danger': props.ghost,
          })}
        >
          {props.item.action === 'ADD' ? (
            <AddSortableItem
              {...props}
              title={props.depth ? 'Tambah Artikel' : 'Tambah Modul'}
              onClick={() => {
                if (props.depth) {
                  setItems((prevItems) => {
                    return prevItems.map((prevItem) => {
                      if (prevItem.id !== props.parent?.id) return prevItem

                      const id = randomString(16)
                      prevItem.children?.splice(
                        prevItem.children.length - 1,
                        0,
                        {
                          id: id,
                          title: `Item ${id}`,
                        }
                      )

                      return {
                        ...prevItem,
                        children: prevItem.children
                          ? [...prevItem.children]
                          : undefined,
                      }
                    })
                  })
                } else {
                  setItems((prevItems) => {
                    const id = randomString(16)
                    prevItems.splice(prevItems.length - 1, 0, {
                      id: id,
                      title: `Item ${id}`,
                      children: [{ id: randomString(16), action: 'ADD' }],
                      collapsed: true,
                    })
                    return [...prevItems]
                  })
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
}: TreeItemComponentProps<TreeItemDataType>) => {
  return (
    <div className="flex gap-2 justify-between bg-white rounded-md border border-muted px-1 py-2">
      <div className="flex items-center gap-2 flex-1">
        <ActionIcon size="sm" variant="text" color="gray" {...handleProps}>
          <MdDragIndicator />
        </ActionIcon>
        <span>{item.title}</span>
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
      {!!childCount && (
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
      className="flex items-center gap-2 bg-white rounded-md border border-muted w-full px-1 py-2 active:enabled:translate-y-px"
      onClick={onClick}
    >
      <figure className="inline-flex items-center justify-center size-7">
        <MdAdd />
      </figure>
      <span>{title}</span>
    </button>
  )
}
