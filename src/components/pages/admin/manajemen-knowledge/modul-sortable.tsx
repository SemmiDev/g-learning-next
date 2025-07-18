import {
  SortableTree,
  TreeItemComponentProps,
  TreeItems,
} from 'dnd-kit-sortable-tree'
import {
  FlattenedItem,
  ItemChangedReason,
} from 'dnd-kit-sortable-tree/dist/types'
import { create } from 'zustand'
import ModulSortableTreeItemComponent, {
  MakeTreeAddNewItem,
  MakeTreeItem,
  TreeItemDataType,
} from './modul-sortable-wrapper'

const initialTreeData: TreeItems<TreeItemDataType> = [
  MakeTreeItem({
    children: [...Array(3)].map(() => MakeTreeItem({ parent: 0 })),
  }),
  MakeTreeItem(),
  MakeTreeItem({
    children: [...Array(2)].map(() => MakeTreeItem({ parent: 0 })),
  }),
  MakeTreeItem(),
  MakeTreeItem(),
  MakeTreeItem(),
  MakeTreeAddNewItem(),
]

export default function ModulSortable() {
  const { items, changeItem } = useManajemenKnowledgeModulStore()

  return (
    <SortableTree
      items={items}
      onItemsChanged={changeItem}
      indentationWidth={40}
      dropAnimation={null}
      sortableProps={{
        animateLayoutChanges: () => false,
      }}
      TreeItemComponent={ModulSortableTreeItemComponent}
    />
  )
}

type ManajemenKnowledgeModulStoreType = {
  items: TreeItems<TreeItemDataType>
  setItems: (items: ManajemenKnowledgeModulStoreType['items']) => void
  addItem: (treeItem: TreeItemComponentProps<TreeItemDataType>) => void
  changeItem: (
    items: TreeItems<TreeItemDataType>,
    reason: ItemChangedReason<FlattenedItem<TreeItemDataType>>
  ) => void
}

export const useManajemenKnowledgeModulStore =
  create<ManajemenKnowledgeModulStoreType>((set) => ({
    items: initialTreeData,
    setItems: (items) => set(() => ({ items })),
    addItem: (treeItem) =>
      set(({ items }) => {
        const newItems = [...items]

        // add new item in parent
        if (treeItem.depth) {
          return {
            items: newItems.map((prevItem) => {
              if (prevItem.id !== treeItem.parent?.id) return prevItem

              prevItem.children?.splice(
                prevItem.children.length - 1,
                0,
                MakeTreeItem({ parent: 0 })
              )

              return {
                ...prevItem,
                children: prevItem.children
                  ? [...prevItem.children]
                  : undefined,
              }
            }),
          }
        }
        // add new item in root
        else {
          newItems.splice(newItems.length - 1, 0, MakeTreeItem())
          return { items: newItems }
        }
      }),
    changeItem: (items, reason) =>
      set(({ items: oldItems }) => {
        if (reason.type === 'dropped') {
          const { draggedItem, droppedToParent, draggedFromParent } = reason
          // cancel when dropped to parent on depth more than 0
          if (droppedToParent?.depth !== draggedFromParent?.depth) {
            return { items: oldItems }
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

            return { items: [...items] }
          }
        }

        return { items }
      }),
  }))
