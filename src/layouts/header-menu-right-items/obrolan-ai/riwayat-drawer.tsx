import UbahRiwayatObrolanModal from '@/components/pages/pengguna/obrolan-ai/modal/ubah-obrolan'
import RiwayatItem, {
  RiwayatItemType,
} from '@/components/pages/pengguna/obrolan-ai/riwayat-item'
import {
  ActionIcon,
  ContentLoader,
  Drawer,
  ModalConfirm,
  Title,
} from '@/components/ui'
import { useHandleApiDelete } from '@/hooks/handle/use-handle-delete'
import { useSessionJwt } from '@/hooks/use-session-jwt'
import { useShowModal } from '@/hooks/use-show-modal'
import { hapusRiwayatObrolanAiApi } from '@/services/api/shared/riwayat-obrolan-ai/hapus'
import { listRiwayatObrolanAiApi } from '@/services/api/shared/riwayat-obrolan-ai/list'
import { useAiChatStore } from '@/stores/ai-chat'
import { useInfiniteQuery } from '@tanstack/react-query'
import { PiXBold } from 'react-icons/pi'
import useInfiniteScroll from 'react-infinite-scroll-hook'

const queryKey = ['pengguna.obrolan-ai.riwayat']

export default function RiwayatObrolanAiDrawer() {
  const { openHistory, setOpenHistory, activeHistoryId, setActiveHistoryId } =
    useAiChatStore()
  const { jwt } = useSessionJwt()

  const {
    show: showUbah,
    key: dataUbah,
    doShow: doShowUbah,
    doHide: doHideUbah,
  } = useShowModal<{
    id: string
    judul: string
  }>()

  const { data, isLoading, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey,
    queryFn: async ({ pageParam: page }) => {
      const { data } = await listRiwayatObrolanAiApi({
        jwt,
        page,
      })

      return {
        list: (data?.list ?? []).map((item) => ({
          id: item.id,
          judul: item.judul,
        })) as RiwayatItemType[],
        pagination: data?.pagination,
      }
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.pagination?.hasNextPage
        ? (lastPage.pagination?.page ?? 1) + 1
        : undefined,
  })

  const list = data?.pages.flatMap((page) => page?.list) ?? []

  const [refSentry] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage: hasNextPage,
    onLoadMore: fetchNextPage,
  })

  const {
    handle: handleHapus,
    id: idHapus,
    setId: setIdHapus,
  } = useHandleApiDelete({
    action: hapusRiwayatObrolanAiApi,
    refetchKey: queryKey,
    onFinish: (id) => {
      if (id === activeHistoryId) {
        setActiveHistoryId(undefined)
        setOpenHistory(false)
      }
    },
  })

  return (
    <Drawer
      size="sm"
      isOpen={openHistory}
      onClose={() => setOpenHistory(false)}
      containerClassName="flex flex-col"
    >
      <div className="flex items-center justify-between border-b border-muted gap-2 ps-4 pe-2 py-2">
        <Title as="h5" weight="medium">
          Riwayat Obrolan AI
        </Title>
        <ActionIcon
          size="sm"
          rounded="full"
          variant="text"
          title={'Tutup'}
          onClick={() => setOpenHistory(false)}
        >
          <PiXBold className="size-4" />
        </ActionIcon>
      </div>
      <div className="flex flex-col overflow-y-auto">
        {isLoading ? (
          <ContentLoader className="py-16" />
        ) : (
          list.map((item) => (
            <RiwayatItem
              key={item.id}
              active={item.id === activeHistoryId}
              data={item}
              onClick={(id) => {
                setActiveHistoryId(id)
                setOpenHistory(false)
              }}
              onRename={(id) => doShowUbah({ id, judul: item.judul })}
              onDelete={(id) => setIdHapus(id)}
              className="px-2"
            />
          ))
        )}
      </div>

      {hasNextPage && <ContentLoader ref={refSentry} className="py-4" />}

      <UbahRiwayatObrolanModal
        show={showUbah}
        data={dataUbah}
        onHide={doHideUbah}
        className="z-[9999]"
      />

      <ModalConfirm
        title="Hapus Obrolan"
        desc="Apakah Anda yakin ingin menghapus obrolan ini?"
        color="danger"
        isOpen={!!idHapus}
        onClose={() => setIdHapus(undefined)}
        onConfirm={handleHapus}
        headerIcon="help"
        className="z-[9999]"
        closeOnCancel
        confirmLoading
      />
    </Drawer>
  )
}
