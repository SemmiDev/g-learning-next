import { ModalConfirm } from '@/components/ui'
import { useSessionJwt } from '@/hooks/use-session-jwt'
import { hapusArtikelKnowledgeApi } from '@/services/api/admin/knowledge/artikel/hapus'
import { hapusModulKnowledgeApi } from '@/services/api/admin/knowledge/modul/hapus'
import { listModulKnowledgeApi } from '@/services/api/admin/knowledge/modul/list'
import { handleActionWithToast } from '@/utils/action'
import { useQuery } from '@tanstack/react-query'
import { SortableTree } from 'dnd-kit-sortable-tree'
import TambahModulModal from './modal/tambah-modul'
import UbahModulModal from './modal/ubah-modul'
import ModulSortableTreeItemComponent, {
  MakeTreeAddNewItem,
  MakeTreeItem,
} from './modul-sortable-wrapper'
import { useManajemenKnowledgeSortableStore } from './stores/sortable'

const queryKey = ['admin.manajemen-knowledge.sortable']

export default function ModulSortable() {
  const { processApi } = useSessionJwt()

  const {
    items,
    setItems,
    changeItems,
    showTambahModul,
    setShowTambahModul,
    showUbahModul,
    idUbahModul,
    doHideUbahModul,
    idHapusModul,
    setIdHapusModul,
    onSuccessHapusModul,
    idHapusArtikel,
    setIdHapusArtikel,
    onSuccessHapusArtikel,
  } = useManajemenKnowledgeSortableStore()

  useQuery({
    queryKey,
    queryFn: async () => {
      const { data } = await processApi(listModulKnowledgeApi)

      setItems([
        ...(data?.list.map((item) =>
          MakeTreeItem({
            id: item.id,
            title: item.nama,
            children: item.artikel.map((item) =>
              MakeTreeItem({
                id: item.id,
                title: item.judul,
                badge: item.level,
                parent: 0,
              })
            ),
          })
        ) || []),
        MakeTreeAddNewItem(),
      ])

      return null
    },
    refetchOnWindowFocus: false,
  })

  const handleHapusModul = async () => {
    if (!idHapusModul) return

    await handleActionWithToast(
      processApi(hapusModulKnowledgeApi, idHapusModul),
      {
        loading: 'Menghapus...',
        onSuccess: () => onSuccessHapusModul(),
      }
    )
  }

  const handleHapusArtikel = async () => {
    if (!idHapusArtikel) return

    await handleActionWithToast(
      processApi(hapusArtikelKnowledgeApi, idHapusArtikel),
      {
        loading: 'Menghapus...',
        onSuccess: () => onSuccessHapusArtikel(),
      }
    )
  }

  return (
    <>
      <SortableTree
        items={items}
        onItemsChanged={changeItems}
        indentationWidth={40}
        dropAnimation={null}
        sortableProps={{
          animateLayoutChanges: () => false,
        }}
        TreeItemComponent={ModulSortableTreeItemComponent}
      />

      <TambahModulModal show={showTambahModul} setShow={setShowTambahModul} />

      <UbahModulModal
        show={showUbahModul}
        id={idUbahModul}
        onHide={doHideUbahModul}
      />

      <ModalConfirm
        title="Hapus Modul"
        desc="Apakah Anda yakin ingin menghapus modul ini?"
        color="danger"
        isOpen={!!idHapusModul}
        onClose={() => setIdHapusModul(null)}
        onConfirm={handleHapusModul}
        headerIcon="warning"
        closeOnCancel
      />

      <ModalConfirm
        title="Hapus Artikel"
        desc="Apakah Anda yakin ingin menghapus artikel ini?"
        color="danger"
        isOpen={!!idHapusArtikel}
        onClose={() => setIdHapusArtikel(null)}
        onConfirm={handleHapusArtikel}
        headerIcon="warning"
        closeOnCancel
      />
    </>
  )
}
