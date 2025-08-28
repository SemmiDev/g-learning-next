import { TreeItems } from 'dnd-kit-sortable-tree'
import {
  FlattenedItem,
  ItemChangedReason,
} from 'dnd-kit-sortable-tree/dist/types'
import _ from 'lodash'
import { create } from 'zustand'
import { MakeTreeItem, TreeItemDataType } from '../modul-sortable-wrapper'

type SortableStoreType = {
  isSaving: boolean
  items: TreeItems<TreeItemDataType>
  setItems: (items: SortableStoreType['items']) => void
  addModulItem: (id: string, title: string) => void
  updateModulItem: (id: string, title: string) => void
  addArtikelItem: (
    id: string,
    title: string,
    badge: string,
    idModul: string
  ) => void
  updateArtikelItem: (id: string, title: string, badge: string) => void
  changeItems: (
    items: TreeItems<TreeItemDataType>,
    reason: ItemChangedReason<FlattenedItem<TreeItemDataType>>
  ) => void
  itemsSaved: () => void
  showTambahModul: boolean
  setShowTambahModul: (show: boolean) => void
  idUbahModul: string | null
  showUbahModul: boolean
  doShowUbahModul: (id: string) => void
  doHideUbahModul: () => void
  idHapusModul: string | null
  setIdHapusModul: (
    id: string | null,
    onRemove?: SortableStoreType['removeItem']
  ) => void
  onSuccessHapusModul: () => void
  idHapusArtikel: string | null
  setIdHapusArtikel: (
    id: string | null,
    onRemove?: SortableStoreType['removeItem']
  ) => void
  onSuccessHapusArtikel: () => void
  removeItem?: () => void
}

export const useManajemenKnowledgeSortableStore = create<SortableStoreType>(
  (set) => ({
    isSaving: false,
    items: [],
    setItems: (items) => set(() => ({ items })),
    addModulItem: (id, title) =>
      set(({ items }) => {
        const newItems = [...items]

        newItems.splice(newItems.length - 1, 0, MakeTreeItem({ id, title }))

        return { items: newItems }
      }),
    updateModulItem: (id, title) =>
      set(({ items }) => {
        const newItems = [...items]

        const find = newItems.find((item) => item.id === id)
        if (find) find.title = title

        return { items: newItems }
      }),
    addArtikelItem: (id, title, badge, idModul) =>
      set(({ items }) => {
        const newItems = [...items]

        return {
          items: newItems.map((prevItem) => {
            if (prevItem.id !== idModul) return prevItem

            prevItem.children?.splice(
              prevItem.children.length - 1,
              0,
              MakeTreeItem({ id, title, badge, parent: 0 })
            )

            return {
              ...prevItem,
              children: prevItem.children ? [...prevItem.children] : undefined,
            }
          }),
        }
      }),
    updateArtikelItem: (id, title, badge) =>
      set(({ items }) => {
        const newItems = [...items]

        const flatted = newItems.flatMap((item) => item.children || [])
        const find = flatted.find((item) => item.id === id)
        if (find) {
          find.title = title
          find.badge = badge
        }

        return { items: newItems }
      }),
    changeItems: (items, reason) =>
      set(({ items: oldItems }) => {
        if (reason.type === 'dropped') {
          const { draggedItem, droppedToParent, draggedFromParent } = reason

          // cancel when dropped to parent on depth more than 0
          if (droppedToParent?.depth !== draggedFromParent?.depth) {
            return { items: oldItems }
          }

          // cancel when olditems is equals to newitems
          if (
            _.isEqual(
              _.flatMapDeep(oldItems, (item) => [
                item,
                ...(item.children ?? []),
              ]).map((item) => item.id),
              _.flatMapDeep(items, (item) => [
                item,
                ...(item.children ?? []),
              ]).map((item) => item.id)
            )
          ) {
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

            return { items: [...items], isSaving: true }
          }

          return { items, isSaving: true }
        }

        return { items }
      }),
    itemsSaved: () => set(() => ({ isSaving: false })),
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
      set(() => ({ idHapusModul: id, removeItem: onRemove })),
    onSuccessHapusModul: () =>
      set(({ removeItem }) => {
        removeItem?.()
        return { idHapusModul: null, removeItem: undefined }
      }),
    idHapusArtikel: null,
    setIdHapusArtikel: (id, onRemove) =>
      set(() => ({
        idHapusArtikel: id,
        removeItem: onRemove,
      })),
    onSuccessHapusArtikel: () =>
      set(({ removeItem }) => {
        removeItem?.()
        return {
          idHapusArtikel: null,
          removeItem: undefined,
        }
      }),
  })
)
