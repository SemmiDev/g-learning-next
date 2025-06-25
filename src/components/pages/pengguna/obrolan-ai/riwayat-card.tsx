import {
  Card,
  CardSeparator,
  Loader,
  ModalConfirm,
  Text,
  Title,
} from '@/components/ui'
import { useHandleApiDelete } from '@/hooks/handle/use-handle-delete'
import { useSessionJwt } from '@/hooks/use-session-jwt'
import { useShowModal } from '@/hooks/use-show-modal'
import { hapusRiwayatObrolanAiApi } from '@/services/api/shared/riwayat-obrolan-ai/hapus'
import { listRiwayatObrolanAiApi } from '@/services/api/shared/riwayat-obrolan-ai/list'
import { useAiChatStore } from '@/stores/ai-chat'
import cn from '@/utils/class-names'
import { useInfiniteQuery } from '@tanstack/react-query'
import { LuPlus } from 'react-icons/lu'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import UbahRiwayatObrolanModal from './modal/ubah-obrolan'
import RiwayatItem, { RiwayatItemType } from './riwayat-item'

const queryKey = ['pengguna.obrolan-ai.riwayat']

type RiwayatCardProps = {
  className?: string
}

export default function RiwayatCard({ className }: RiwayatCardProps) {
  const { jwt } = useSessionJwt()
  const { activeHistoryId, setActiveHistoryId } = useAiChatStore()

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
      }
    },
  })

  return (
    <>
      <Card className={cn('flex flex-col p-0', className)}>
        <Title as="h5" weight="semibold" className="px-2 py-1.5">
          Riwayat Obrolan
        </Title>
        <CardSeparator />
        <div className="flex flex-col">
          <ObrolanBaru
            active={activeHistoryId === undefined}
            onClick={() => setActiveHistoryId(undefined)}
          />
          <CardSeparator />
          {isLoading ? (
            <Loader className="py-4" />
          ) : (
            list.map((item) => (
              <RiwayatItem
                key={item.id}
                active={item.id === activeHistoryId}
                data={item}
                onClick={(id) => setActiveHistoryId(id)}
                onRename={(id) => doShowUbah({ id, judul: item.judul })}
                onDelete={(id) => setIdHapus(id)}
              />
            ))
          )}
          {hasNextPage && <Loader ref={refSentry} className="py-4" />}
        </div>
      </Card>

      <UbahRiwayatObrolanModal
        show={showUbah}
        data={dataUbah}
        onHide={doHideUbah}
      />

      <ModalConfirm
        title="Hapus Riwayat Obrolan"
        desc="Apakah Anda yakin ingin menghapus riwayat obrolan ini?"
        color="danger"
        isOpen={!!idHapus}
        onClose={() => setIdHapus(undefined)}
        onConfirm={handleHapus}
        headerIcon="help"
        closeOnCancel
        confirmLoading
      />
    </>
  )
}

function ObrolanBaru({
  active,
  onClick,
}: {
  active?: boolean
  onClick?: () => void
}) {
  return (
    <div
      className={cn(
        'flex items-center cursor-pointer truncate p-2 hover:bg-gray-50/50',
        {
          'bg-blue-50/30 text-primary-dark': active,
        }
      )}
      onClick={onClick}
    >
      <LuPlus className="size-3 me-1" />
      <Text size="sm" weight="semibold">
        Obrolan Baru
      </Text>
    </div>
  )
}
