import { ActionIcon, Button, TextSpan } from '@/components/ui'
import cn from '@/utils/class-names'
import { randomString } from '@/utils/random'
import {
  SimpleTreeItemWrapper,
  TreeItem,
  TreeItemComponentProps,
} from 'dnd-kit-sortable-tree'
import { forwardRef } from 'react'
import { BsChevronDown, BsChevronUp, BsPencilSquare } from 'react-icons/bs'
import { MdAdd, MdClose, MdDragIndicator } from 'react-icons/md'
import { useManajemenKnowledgeArtikelStore } from './stores/artikel'
import { useManajemenKnowledgeSortableStore } from './stores/sortable'

export type TreeItemDataType = {
  title?: string
  action?: 'ADD'
}

export const MakeTreeItem = ({
  id,
  title,
  action,
  parent,
  children,
}: TreeItemDataType & {
  id?: string
  parent?: number
  children?: TreeItem<TreeItemDataType>[]
} = {}): TreeItem<TreeItemDataType> => {
  const newId = randomString(16)

  return {
    id: id ?? newId,
    title: title ?? (action !== 'ADD' ? `Item ${newId}` : undefined),
    action,
    children:
      action !== 'ADD' && parent === undefined
        ? [...(children ?? []), MakeTreeAddNewItem()]
        : undefined,
    collapsed: true,
    disableSorting: action === 'ADD',
    canHaveChildren: action !== 'ADD' && parent === undefined,
  }
}

export const MakeTreeAddNewItem = () => MakeTreeItem({ action: 'ADD' })

const ModulSortableTreeItemComponent = forwardRef<
  HTMLDivElement,
  TreeItemComponentProps<TreeItemDataType>
>((props: TreeItemComponentProps<TreeItemDataType>, ref) => {
  const { setShowTambahModul } = useManajemenKnowledgeSortableStore()
  const { tambahArtikel, ubahArtikel } = useManajemenKnowledgeArtikelStore()

  return (
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
            if (props.depth && props.parent?.id) {
              tambahArtikel(props.parent?.id as string)
            } else {
              setShowTambahModul(true)
            }
          }}
        />
      ) : (
        <SortableItem {...props} />
      )}
    </SimpleTreeItemWrapper>
  )
})

export default ModulSortableTreeItemComponent

const SortableItem = ({
  item,
  childCount,
  handleProps,
  onRemove,
  collapsed,
  clone,
}: TreeItemComponentProps<TreeItemDataType>) => {
  const { setIdHapusModul, doShowUbahModul } =
    useManajemenKnowledgeSortableStore()

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
        {
          <Button
            size="sm"
            color="warning"
            variant="text-colorful"
            className="min-h-0 px-1"
            onClick={(e) => {
              e.stopPropagation()
              doShowUbahModul(item.id as string)
            }}
          >
            <BsPencilSquare className="size-3" />
          </Button>
        }
      </div>
      {onRemove && (!childCount || childCount <= 1) && (
        <ActionIcon
          size="sm"
          color="danger"
          variant="outline-hover-colorful"
          onClick={(e) => {
            e.stopPropagation()
            setIdHapusModul(item.id as string, onRemove)
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
