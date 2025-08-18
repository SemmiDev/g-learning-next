'use client'

import {
  Button,
  ContentLoader,
  Input,
  Label,
  Modal,
  Text,
} from '@/components/ui'
import { useAutoSizeMediumModal } from '@/hooks/auto-size-modal/use-medium-modal'
import { useSessionJwt } from '@/hooks/use-session-jwt'
import { listKelasApi } from '@/services/api/shared/kelas/list'
import cn from '@/utils/class-names'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { PiMagnifyingGlass } from 'react-icons/pi'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import { useDebounce } from 'react-use'
import { FieldError } from 'rizzui'
import KelasButton, { KelasItemType } from './kelas-button'
import SelectedKelas from './selected-kelas'

export type KelasProps = {
  label?: string
  required?: boolean
  placeholder?: string
  value?: KelasItemType
  onChange?(val?: KelasItemType): void
  semester?: string
  type?: 'Pengajar' | 'Peserta'
  error?: string
  errorClassName?: string
  clearable?: boolean
}

export default function Kelas({
  label,
  required,
  placeholder = 'Klik di sini untuk memilih kelas',
  value,
  onChange,
  type,
  semester,
  error,
  errorClassName,
  clearable,
}: KelasProps) {
  const { jwt } = useSessionJwt()
  const { status } = useSession()
  const size = useAutoSizeMediumModal()

  const [show, setShow] = useState(false)
  const [search, setSearch] = useState('')
  const [checkedKelas, setCheckedKelas] = useState<KelasItemType | undefined>()
  const [selectedKelas, setSelectedKelas] = useState<KelasItemType | undefined>(
    value
  )

  const doChange = (selected?: KelasItemType) => {
    setSelectedKelas(selected)

    onChange && onChange(selected)
  }

  const queryKey = ['shared.kelas.list', type || null, semester || null]

  const {
    data: dataKelas,
    isLoading: isLoadingKelas,
    isFetching: isFetchingKelas,
    refetch: refetchKelas,
    hasNextPage: hasNextPageKelas,
    fetchNextPage: fetchNextPageKelas,
  } = useInfiniteQuery({
    queryKey,
    queryFn: async ({ pageParam: page }) => {
      const { data } = await listKelasApi({
        jwt,
        page,
        search,
        semester,
        kategori:
          type === 'Pengajar'
            ? 'Dikelola'
            : type === 'Peserta'
            ? 'Diikuti'
            : undefined,
      })

      return {
        list: (data?.list ?? []).map((item) => ({
          id: item.kelas.id,
          program: item.kelas.nama_kelas,
          kelas: item.kelas.sub_judul,
          semester: item.kelas.id_kelas_semester || undefined,
          instansi: item.kelas.nama_instansi,
          cover: item.kelas.thumbnail,
        })) as KelasItemType[],
        pagination: data?.pagination,
      }
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.pagination?.hasNextPage
        ? (lastPage.pagination?.page ?? 1) + 1
        : undefined,
  })

  const listKelas = dataKelas?.pages.flatMap((page) => page.list) || []

  const [refSentry] = useInfiniteScroll({
    loading: isLoadingKelas,
    hasNextPage: hasNextPageKelas,
    onLoadMore: fetchNextPageKelas,
  })

  useDebounce(() => refetchKelas(), search ? 250 : 0, [refetchKelas, search])

  useEffect(() => {
    setSelectedKelas(value)
  }, [value])

  if (status === 'unauthenticated') {
    return (
      <div className="text-danger text-sm font-semibold border border-danger rounded-md ring-[0.6px] ring-muted min-h-10 uppercase py-2 px-[0.875rem]">
        Penggunaan kelas mengharuskan untuk login!
      </div>
    )
  }

  return (
    <>
      <div>
        {label && (
          <label className="text-gray-dark font-semibold mb-1.5 block">
            <Label label={label} required={required} />
          </label>
        )}
        <div
          className={cn(
            'flex flex-wrap items-center gap-2 text-gray text-sm border border-muted cursor-pointer rounded-md transition duration-200 ring-[0.6px] ring-muted min-h-10 py-2 px-3 hover:border-primary [&_.kelas-label]:hover:text-primary',
            {
              '!border-danger [&.is-hover]:!border-danger [&.is-focus]:!border-danger !ring-danger !bg-transparent':
                error,
            }
          )}
          onClick={() => {
            setCheckedKelas(selectedKelas)
            refetchKelas()
            setShow(true)
          }}
        >
          {selectedKelas ? (
            <SelectedKelas
              kelas={selectedKelas}
              onRemove={clearable ? () => doChange(undefined) : undefined}
            />
          ) : (
            <Text size="sm" className="kelas text-gray-lighter">
              {placeholder}
            </Text>
          )}
        </div>

        {error && (
          <FieldError size="md" error={error} className={errorClassName} />
        )}
      </div>

      <Modal
        title="Cari dan Pilih Kelas"
        size={size}
        isOpen={show}
        onClose={() => setShow(false)}
        isLoading={isFetchingKelas}
        containerClassName="max-h-dvh"
        bodyClassName="justify-between"
      >
        <div className="flex flex-col min-h-[400px]">
          <div className="flex justify-between gap-x-2 border-b border-muted p-3">
            <Input
              size="sm"
              type="search"
              placeholder="Cari Kelas"
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
          <div className="flex flex-col overflow-y-auto sm:max-h-[400px]">
            {isLoadingKelas || (!listKelas.length && isFetchingKelas) ? (
              <ContentLoader height={320} />
            ) : listKelas.length > 0 ? (
              listKelas.map((kelas) => (
                <KelasButton
                  key={kelas.id}
                  kelas={kelas}
                  checked={checkedKelas?.id === kelas.id}
                  onChange={() => setCheckedKelas(kelas)}
                  onDoubleClick={() => {
                    doChange(kelas)
                    setShow(false)
                  }}
                />
              ))
            ) : (
              <div className="flex items-center justify-center h-80">
                <Text size="sm" weight="medium">
                  {search ? 'Kelas tidak ditemukan' : 'Belum ada Kelas'}
                </Text>
              </div>
            )}
            {!isLoadingKelas && hasNextPageKelas && (
              <ContentLoader ref={refSentry} size="sm" className="py-4" />
            )}
          </div>
        </div>
        <div className="flex gap-x-2 border-t border-t-muted p-3 sm:justify-end">
          <Button
            size="sm"
            className="w-full sm:w-36"
            onClick={() => {
              doChange(checkedKelas)
              setShow(false)
            }}
            disabled={!checkedKelas}
          >
            Pilih Kelas
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="w-full sm:w-36"
            onClick={() => setShow(false)}
          >
            Batal
          </Button>
        </div>
      </Modal>
    </>
  )
}
