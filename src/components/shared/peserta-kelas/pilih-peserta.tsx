'use client'

import { listPesertaKelasAction } from '@/services/api/shared/peserta-kelas/list'
import {
  Button,
  CardSeparator,
  Input,
  Loader,
  Modal,
  Text,
} from '@/components/ui'
import { useAutoSizeMediumModal } from '@/hooks/auto-size-modal/use-medium-modal'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { PiMagnifyingGlass } from 'react-icons/pi'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import { useDebounce } from 'react-use'
import PesertaButton, { PesertaKelasItemType } from './peserta-button'

const queryKey = ['shared.peserta.list-pilih']

export type PilihPesertaKelasProps = {
  idKelas: string
  show: boolean
  setShow: (show: boolean) => void
  onSelect?(val: PesertaKelasItemType): void
}

export default function PilihPesertaKelas({
  idKelas,
  show = false,
  setShow,
  onSelect,
}: PilihPesertaKelasProps) {
  const { status } = useSession()
  const size = useAutoSizeMediumModal()

  const [search, setSearch] = useState('')
  const [checkedPeserta, setCheckedPeserta] = useState<
    PesertaKelasItemType | undefined
  >()

  const {
    data: data,
    isLoading: isLoading,
    isFetching: isFetching,
    refetch: refetch,
    hasNextPage: hasNextPage,
    fetchNextPage: fetchNextPage,
  } = useInfiniteQuery({
    queryKey,
    queryFn: async ({ pageParam: page }) => {
      const { data } = await listPesertaKelasAction({
        page,
        search,
        idKelas,
      })

      return {
        list: (data?.list ?? []).map((item) => ({
          id: item.id_peserta,
          nama: item.nama,
          email: item.email || undefined,
          foto: item.foto || undefined,
        })) as PesertaKelasItemType[],
        pagination: data?.pagination,
      }
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.pagination?.hasNextPage
        ? (lastPage.pagination?.page ?? 1) + 1
        : undefined,
  })

  const list = data?.pages.flatMap((page) => page.list) || []

  const [refSentry] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage: hasNextPage,
    onLoadMore: fetchNextPage,
  })

  useDebounce(() => refetch(), search ? 250 : 0, [refetch, search])

  if (status === 'unauthenticated') {
    return (
      <div className="text-danger text-sm font-semibold border border-danger rounded-md ring-[0.6px] ring-muted min-h-10 uppercase py-2 px-[0.875rem]">
        Penggunaan peserta mengharuskan untuk login!
      </div>
    )
  }

  return (
    <>
      <Modal
        title="Cari dan Pilih Peserta"
        size={size}
        isOpen={show}
        onClose={() => setShow(false)}
        isLoading={isFetching}
      >
        <div className="flex flex-col justify-between min-h-[calc(100vh-57px)] lg:min-h-full">
          <div className="flex flex-col min-h-[400px]">
            <div className="flex justify-between gap-x-2 border-b border-muted p-3">
              <Input
                size="sm"
                type="search"
                placeholder="Cari Peserta"
                clearable
                className="flex-1"
                prefix={
                  <PiMagnifyingGlass size={20} className="text-gray-lighter" />
                }
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onClear={() => setSearch('')}
              />
            </div>
            <div className="flex flex-col overflow-y-auto lg:max-h-[400px]">
              {isLoading || (!list.length && isFetching) ? (
                <Loader height={320} />
              ) : list.length > 0 ? (
                list.map((peserta, idx) => (
                  <PesertaButton
                    key={peserta.id + idx}
                    peserta={peserta}
                    checked={checkedPeserta?.id === peserta.id}
                    onChange={() => {
                      setCheckedPeserta(peserta)
                    }}
                  />
                ))
              ) : (
                <div className="flex items-center justify-center h-80">
                  <Text size="sm" weight="medium">
                    {search ? 'Peserta tidak ditemukan' : 'Belum ada Peserta'}
                  </Text>
                </div>
              )}
              {!isLoading && hasNextPage && (
                <Loader ref={refSentry} size="sm" className="py-4" />
              )}
            </div>
          </div>
          <div>
            <CardSeparator />
            <div className="flex justify-end gap-x-2 p-3">
              <Button
                size="sm"
                className="w-36"
                onClick={() => {
                  onSelect && checkedPeserta && onSelect(checkedPeserta)
                  setShow(false)
                }}
                disabled={!checkedPeserta}
              >
                Pilih Peserta
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="w-36"
                onClick={() => setShow(false)}
              >
                Batal
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}
