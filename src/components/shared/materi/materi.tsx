'use client'

import { hapusMateriAction } from '@/actions/shared/materi/hapus'
import { hapusKategoriMateriAction } from '@/actions/shared/materi/hapus-kategori'
import { listMateriAction } from '@/actions/shared/materi/list'
import { listKategoriMateriAction } from '@/actions/shared/materi/list-kategori'
import {
  Button,
  CardSeparator,
  Input,
  Label,
  Loader,
  Modal,
  ModalConfirm,
  ModalFooterButtons,
  Text,
} from '@/components/ui'
import { useAutoSizeLargeModal } from '@/hooks/auto-size-modal/use-large-modal'
import { useHandleDelete } from '@/hooks/handle/use-handle-delete'
import { useShowModal } from '@/hooks/use-show-modal'
import { handleActionWithToast } from '@/utils/action'
import cn from '@/utils/class-names'
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { BiChevronRight } from 'react-icons/bi'
import { PiMagnifyingGlass } from 'react-icons/pi'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import { useDebounce } from 'react-use'
import { FieldError } from 'rizzui'
import KategoriButton, { KategoriItemType } from './kategori-button'
import MateriButton, { MateriItemType } from './materi-button'
import LihatMateriModal from './modal/lihat-materi'
import TambahKategoriModal from './modal/tambah-kategori'
import TambahMateriModal from './modal/tambah-materi'
import UbahKategoriModal from './modal/ubah-kategori'
import UbahMateriModal from './modal/ubah-materi'
import SelectedMateri from './selected-materi'

const queryKeyKategori = ['shared.materi.kategori']

export type MateriProps = {
  label?: string
  required?: boolean
  placeholder?: string
  type?: 'materi' | 'tugas'
  value?: MateriItemType
  onChange?(val?: MateriItemType): void
  multiple?: boolean
  error?: string
  errorClassName?: string
}

export default function Materi({
  label,
  required,
  placeholder = 'Klik di sini untuk memilih dari bank materi',
  type,
  value,
  onChange,
  error,
  errorClassName,
}: MateriProps) {
  const { status } = useSession()
  const queryClient = useQueryClient()
  const size = useAutoSizeLargeModal()
  const [show, setShow] = useState(false)

  const [activeKategori, setActiveKategori] = useState<KategoriItemType>()
  const [searchKategori, setSearchKategori] = useState('')
  const [showTambahKategori, setShowTambahKategori] = useState(false)
  const {
    show: showUbahKategori,
    key: keyUbahKategori,
    doShow: doShowUbahKategori,
    doHide: doHideUbahKategori,
  } = useShowModal<string>()

  const [searchMateri, setSearchMateri] = useState('')
  const [showTambahMateri, setShowTambahMateri] = useState(false)
  const {
    show: showLihatMateri,
    key: keyLihatMateri,
    doShow: doShowLihatMateri,
    doHide: doHideLihatMateri,
  } = useShowModal<string>()
  const {
    show: showUbahMateri,
    key: keyUbahMateri,
    doShow: doShowUbahMateri,
    doHide: doHideUbahMateri,
  } = useShowModal<string>()
  const [idHapusMateri, setIdHapusMateri] = useState<string>()
  const [checkedMateri, setCheckedMateri] = useState<MateriItemType>()
  const [selectedMateri, setSelectedMateri] = useState<
    MateriItemType | undefined
  >(value)

  const tipe =
    type === 'materi' ? 'Materi' : type === 'tugas' ? 'Penugasan' : undefined

  const doChange = (selected: MateriItemType | undefined) => {
    setSelectedMateri(selected)

    onChange && onChange(selected)
  }

  const {
    data: dataKategori,
    isLoading: isLoadingKategori,
    isFetching: isFetchingKategori,
    refetch: refetchKategori,
    hasNextPage: hasNextPageKategori,
    fetchNextPage: fetchNextPageKategori,
  } = useInfiniteQuery({
    queryKey: queryKeyKategori,
    queryFn: async ({ pageParam: page }) => {
      const { data } = await listKategoriMateriAction({
        page,
        search: searchKategori,
        tipe,
      })

      return {
        list: (data?.list ?? []).map((item) => ({
          id: item.id,
          name: item.nama_kategori,
          count: item.total_materi,
        })) as KategoriItemType[],
        pagination: data?.pagination,
      }
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.pagination?.hasNextPage
        ? (lastPage.pagination?.page ?? 1) + 1
        : undefined,
  })

  const listKategori = dataKategori?.pages.flatMap((page) => page.list) || []

  const [refSentryKategori] = useInfiniteScroll({
    loading: isLoadingKategori,
    hasNextPage: hasNextPageKategori,
    onLoadMore: fetchNextPageKategori,
  })

  const queryKeyMateri = [
    'shared.materi.list',
    type ?? 'all',
    activeKategori?.id,
  ]

  const {
    data: dataMateri,
    isLoading: isLoadingMateri,
    isFetching: isFetchingMateri,
    refetch: refetchMateri,
    hasNextPage: hasNextPageMateri,
    fetchNextPage: fetchNextPageMateri,
  } = useInfiniteQuery({
    queryKey: queryKeyMateri,
    queryFn: async ({ pageParam: page }) => {
      if (!activeKategori?.id) return { list: [] }

      const { data } = await listMateriAction({
        page,
        search: searchMateri,
        idKategori: activeKategori.id,
        tipe,
      })

      return {
        list: (data?.list ?? []).map((item) => ({
          id: item.bank_ajar.id,
          name: item.bank_ajar.judul,
          desc: item.bank_ajar.deskripsi,
          time: item.bank_ajar.created_at,
          fileCount: item.total_file_bank_ajar,
          fileIds: item.daftar_file_bank_ajar.map((item) => item.id),
          type: item.bank_ajar.tipe === 'Materi' ? 'materi' : 'tugas',
        })) as MateriItemType[],
        pagination: data?.pagination,
      }
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.pagination?.hasNextPage
        ? (lastPage.pagination?.page ?? 1) + 1
        : undefined,
  })

  const listMateri = dataMateri?.pages.flatMap((page) => page.list) || []

  const [refSentryMateri] = useInfiniteScroll({
    loading: isLoadingMateri,
    hasNextPage: hasNextPageMateri,
    onLoadMore: fetchNextPageMateri,
  })

  useDebounce(() => refetchKategori(), searchKategori ? 250 : 0, [
    refetchKategori,
    searchKategori,
  ])

  useDebounce(() => refetchMateri(), searchMateri ? 250 : 0, [
    refetchMateri,
    searchMateri,
  ])

  const {
    handle: handleHapusKategori,
    id: idHapusKategori,
    setId: setIdHapusKategori,
  } = useHandleDelete({
    action: hapusKategoriMateriAction,
    refetchKey: queryKeyKategori,
  })

  const handleHapusMateri = () => {
    if (!activeKategori?.id || !idHapusMateri) return

    handleActionWithToast(hapusMateriAction(activeKategori.id, idHapusMateri), {
      loading: 'Menghapus...',
      onSuccess: () => {
        setIdHapusMateri(undefined)

        queryClient.invalidateQueries({ queryKey: queryKeyMateri })
      },
    })
  }

  if (status === 'unauthenticated') {
    return (
      <div className="text-danger text-sm font-semibold border border-danger rounded-md ring-[0.6px] ring-muted min-h-10 uppercase py-2 px-[0.875rem]">
        Penggunaan materi mengharuskan untuk login!
      </div>
    )
  }

  return (
    <>
      <div>
        <div
          onClick={() => {
            setCheckedMateri(selectedMateri)
            refetchKategori()
            setShow(true)
          }}
        >
          {label && (
            <label className="text-gray-dark font-semibold mb-1.5 block">
              <Label label={label} required={required} />
            </label>
          )}
          <div
            className={cn(
              'flex flex-wrap items-center gap-2 text-gray text-sm border border-muted cursor-pointer rounded-md transition duration-200 ring-[0.6px] ring-muted min-h-10 py-2 px-[0.875rem] hover:border-primary [&_.materi-label]:hover:text-primary',
              {
                '!border-danger [&.is-hover]:!border-danger [&.is-focus]:!border-danger !ring-danger !bg-transparent':
                  error,
              }
            )}
          >
            {selectedMateri && (
              <SelectedMateri
                materi={selectedMateri}
                onRemove={() => {
                  doChange(undefined)
                }}
              />
            )}
            <Text size="sm" className="materi text-gray-lighter">
              {placeholder}
            </Text>
          </div>
        </div>
        {error && (
          <FieldError size="md" error={error} className={errorClassName} />
        )}
      </div>

      <Modal
        title="Materi dan Tugas"
        size={size}
        isOpen={show}
        onClose={() => setShow(false)}
        isLoading={isFetchingKategori || isFetchingMateri}
        bodyClassName="justify-between"
      >
        <div className="flex flex-col min-h-[400px]">
          <div className="flex justify-between flex-wrap gap-2 p-3">
            {activeKategori ? (
              <Input
                size="sm"
                type="search"
                placeholder="Cari Materi"
                clearable
                className="w-72 sm:w-96"
                prefix={
                  <PiMagnifyingGlass size={20} className="text-gray-lighter" />
                }
                value={searchMateri}
                onChange={(e) => setSearchMateri(e.target.value)}
                onClear={() => setSearchMateri('')}
              />
            ) : (
              <Input
                size="sm"
                type="search"
                placeholder="Cari Kategori"
                clearable
                className="w-72 sm:w-96"
                prefix={
                  <PiMagnifyingGlass size={20} className="text-gray-lighter" />
                }
                value={searchKategori}
                onChange={(e) => setSearchKategori(e.target.value)}
                onClear={() => setSearchKategori('')}
              />
            )}
            <Button
              size="sm"
              onClick={() => {
                if (activeKategori) {
                  setShowTambahMateri(true)
                } else {
                  setShowTambahKategori(true)
                }
              }}
            >
              {activeKategori ? 'Tambah Materi' : 'Tambah Kategori'}
            </Button>
          </div>
          <div className="flex items-center border-b border-b-gray-100 px-3 pb-3">
            <Text
              weight="medium"
              variant="dark"
              className={cn({ 'select-none cursor-pointer': activeKategori })}
              onClick={() => {
                activeKategori && setActiveKategori(undefined)
                searchMateri && setSearchMateri('')
                refetchKategori()
              }}
            >
              Bank Materi dan Tugas
            </Text>
            {activeKategori && (
              <>
                <BiChevronRight size={24} />
                <Text weight="medium" variant="dark">
                  {activeKategori.name}
                </Text>
              </>
            )}
          </div>
          <div className="flex flex-col overflow-y-auto lg:max-h-[400px]">
            {activeKategori && (
              <>
                {isLoadingMateri || (!listMateri.length && isFetchingMateri) ? (
                  <Loader height={320} />
                ) : listMateri.length > 0 ? (
                  listMateri.map((materi) => (
                    <MateriButton
                      key={materi.id}
                      materi={materi}
                      type={type}
                      onDetail={(materi) => doShowLihatMateri(materi.id)}
                      onEdit={(materi) => doShowUbahMateri(materi.id)}
                      onDelete={(materi) => setIdHapusMateri(materi.id)}
                      checked={checkedMateri?.id === materi.id}
                      onChange={() => {
                        setCheckedMateri(materi)
                      }}
                    />
                  ))
                ) : (
                  <div className="flex items-center justify-center h-80">
                    <Text size="sm" weight="medium">
                      {searchMateri
                        ? 'Materi tidak ditemukan'
                        : 'Belum ada materi'}
                    </Text>
                  </div>
                )}
                {!isLoadingMateri && hasNextPageMateri && (
                  <Loader ref={refSentryMateri} size="sm" className="py-4" />
                )}
              </>
            )}
            {!activeKategori && (
              <>
                {isLoadingKategori ||
                (!listKategori.length && isFetchingKategori) ? (
                  <Loader height={288} />
                ) : listKategori.length > 0 ? (
                  listKategori.map((kategori) => (
                    <KategoriButton
                      key={kategori.id}
                      kategori={kategori}
                      onOpen={(kategori) => setActiveKategori(kategori)}
                      onEdit={(kategori) => doShowUbahKategori(kategori.id)}
                      onDelete={(kategori) => setIdHapusKategori(kategori.id)}
                    />
                  ))
                ) : (
                  <div className="flex items-center justify-center h-72">
                    <Text size="sm" weight="medium">
                      {searchKategori
                        ? 'Kategori tidak ditemukan'
                        : 'Belum ada kategori'}
                    </Text>
                  </div>
                )}
                {!isLoadingKategori && hasNextPageKategori && (
                  <Loader ref={refSentryKategori} size="sm" className="py-4" />
                )}
              </>
            )}
          </div>
        </div>

        <ModalFooterButtons size="sm" onCancel={() => setShow(false)} borderTop>
          <div className="flex-1">
            <Button
              size="sm"
              className="w-full"
              onClick={() => {
                doChange(checkedMateri)
                setShow(false)
              }}
              disabled={!checkedMateri}
            >
              Pilih{' '}
              {!type ? 'Materi/Tugas' : type === 'materi' ? 'Materi' : 'Tugas'}
            </Button>
          </div>
        </ModalFooterButtons>
      </Modal>

      <TambahKategoriModal
        show={showTambahKategori}
        setShow={setShowTambahKategori}
      />

      <TambahMateriModal
        idKategori={activeKategori?.id}
        show={showTambahMateri}
        setShow={setShowTambahMateri}
      />

      <UbahKategoriModal
        show={showUbahKategori}
        id={keyUbahKategori}
        onHide={doHideUbahKategori}
      />

      <UbahMateriModal
        idKategori={activeKategori?.id}
        show={showUbahMateri}
        id={keyUbahMateri}
        onHide={doHideUbahMateri}
      />

      <LihatMateriModal
        show={showLihatMateri}
        id={keyLihatMateri}
        onHide={doHideLihatMateri}
      />

      <ModalConfirm
        title="Hapus Kategori"
        desc="Apakah Anda yakin ingin menghapus kategori materi ini?"
        color="danger"
        isOpen={!!idHapusKategori}
        onClose={() => setIdHapusKategori(undefined)}
        onConfirm={handleHapusKategori}
        headerIcon="help"
        closeOnCancel
      />

      <ModalConfirm
        title="Hapus Bank Materi"
        desc="Apakah Anda yakin ingin menghapus bank materi ini?"
        color="danger"
        isOpen={!!idHapusMateri}
        onClose={() => setIdHapusMateri(undefined)}
        onConfirm={handleHapusMateri}
        headerIcon="help"
        closeOnCancel
      />
    </>
  )
}
