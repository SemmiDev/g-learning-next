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
import { LuChevronRight } from 'react-icons/lu'
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
  const { idModul, action, tambahArtikel, tutupArtikel } =
    useManajemenKnowledgeArtikelStore()

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
          active={action === 'tambah' && idModul === props.parent?.id}
          onClick={() => {
            if (props.depth && props.parent?.id) {
              if (action === 'tambah' && idModul === props.parent?.id) {
                tutupArtikel()
              } else {
                tambahArtikel(props.parent?.id as string)
              }
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
  depth,
}: TreeItemComponentProps<TreeItemDataType>) => {
  const { isSaving, doShowUbahModul, setIdHapusModul, setIdHapusArtikel } =
    useManajemenKnowledgeSortableStore()
  const { action, id, tutupArtikel, ubahArtikel } =
    useManajemenKnowledgeArtikelStore()

  const active = action === 'ubah' && id === item.id

  const dragProps = !isSaving ? handleProps : {}

  return (
    <div
      className={cn(
        'flex gap-2 justify-between bg-white rounded-md border border-muted hover:bg-muted/5 px-1 py-2',
        {
          'cursor-pointer': depth > 0,
          'bg-warning-lighter/10 text-warning': active,
        }
      )}
      onClick={() => {
        if (depth === 0) return

        if (action === 'ubah' && item.id === id) {
          tutupArtikel()
        } else {
          ubahArtikel(item.id as string)
        }
      }}
    >
      <div
        className={cn('flex items-center gap-1 flex-1', {
          'px-4': clone,
        })}
      >
        {!clone && (
          <ActionIcon
            size="sm"
            variant="text"
            color="gray"
            className={cn('cursor-grab', { 'cursor-not-allowed': isSaving })}
            {...dragProps}
          >
            <MdDragIndicator />
          </ActionIcon>
        )}
        <TextSpan size={clone ? 'base' : 'sm'} weight="medium">
          {item.title}
        </TextSpan>
        {depth === 0 && (
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
        )}
      </div>
      {onRemove && (!childCount || childCount <= 1) && !active && (
        <ActionIcon
          size="sm"
          color="danger"
          variant="outline-hover-colorful"
          onClick={(e) => {
            e.stopPropagation()

            if (depth === 0) {
              setIdHapusModul(item.id as string, onRemove)
            } else {
              setIdHapusArtikel(item.id as string, onRemove)
            }
          }}
        >
          <MdClose />
        </ActionIcon>
      )}
      {active && <LuChevronRight className="size-4 self-center" />}
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
  active,
}: TreeItemComponentProps<TreeItemDataType> & {
  title: string
  onClick?: () => void
  active?: boolean
}) => {
  return (
    <button
      className={cn(
        'flex items-center justify-between gap-1 bg-white rounded-md border border-muted w-full px-1 py-2 active:enabled:translate-y-px',
        {
          'bg-primary-lighter/10 text-primary': active,
        }
      )}
      onClick={onClick}
    >
      <div className="flex items-center gap-1">
        <figure className="inline-flex items-center justify-center size-7">
          <MdAdd />
        </figure>
        <TextSpan size="xs" weight="medium">
          {title}
        </TextSpan>
      </div>
      {active && <LuChevronRight className="size-4" />}
    </button>
  )
}
