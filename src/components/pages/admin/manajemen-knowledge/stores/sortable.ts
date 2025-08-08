import { TreeItemComponentProps, TreeItems } from 'dnd-kit-sortable-tree'
import {
  FlattenedItem,
  ItemChangedReason,
} from 'dnd-kit-sortable-tree/dist/types'
import { create } from 'zustand'
import { MakeTreeItem, TreeItemDataType } from '../modul-sortable-wrapper'

type SortableStoreType = {
  items: TreeItems<TreeItemDataType>
  setItems: (items: SortableStoreType['items']) => void
  addModulItem: (id: string, title: string) => void
  addArtikelItem: (id: string, title: string, parentId: string) => void
  changeItem: (
    items: TreeItems<TreeItemDataType>,
    reason: ItemChangedReason<FlattenedItem<TreeItemDataType>>
  ) => void
  showTambahModul: boolean
  setShowTambahModul: (show: boolean) => void
  idUbahModul: string | null
  showUbahModul: boolean
  doShowUbahModul: (id: string) => void
  doHideUbahModul: () => void
  idHapusModul: string | null
  setIdHapusModul: (
    id: string | null,
    onRemove?: SortableStoreType['removeModulItem']
  ) => void
  onSuccessHapusModul: () => void
  removeModulItem?: () => void
}

export const useManajemenKnowledgeSortableStore = create<SortableStoreType>(
  (set) => ({
    items: [],
    setItems: (items) => set(() => ({ items })),
    addModulItem: (id, title) =>
      set(({ items }) => {
        const newItems = [...items]

        newItems.splice(newItems.length - 1, 0, MakeTreeItem({ id, title }))

        return { items: newItems }
      }),
    addArtikelItem: (id, title, parentId) =>
      set(({ items }) => {
        const newItems = [...items]

        return {
          items: newItems.map((prevItem) => {
            if (prevItem.id !== parentId) return prevItem

            prevItem.children?.splice(
              prevItem.children.length - 1,
              0,
              MakeTreeItem({ id, title, parent: 0 })
            )

            return {
              ...prevItem,
              children: prevItem.children ? [...prevItem.children] : undefined,
            }
          }),
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
    showTambahModul: false,
    setShowTambahModul: (show) => set(() => ({ showTambahModul: show })),
    idUbahModul: null,
    showUbahModul: false,
    doShowUbahModul: (id) =>
      set(() => ({ showUbahModul: true, idUbahModul: id })),
    doHideUbahModul: () => {
      set(() => ({ showUbahModul: false }))

      setTimeout(() => set(() => ({ idUbahModul: null })), 300)
    },
    idHapusModul: null,
    setIdHapusModul: (id, onRemove) =>
      set(() => ({ idHapusModul: id, removeModulItem: onRemove })),
    onSuccessHapusModul: () =>
      set(({ removeModulItem }) => {
        removeModulItem?.()
        return { idHapusModul: null, removeModulItem: undefined }
      }),
  })
)
