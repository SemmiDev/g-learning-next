'use client'

import {
  Button,
  CardSeparator,
  Input,
  Label,
  Loader,
  Modal,
  Text,
} from '@/components/ui'
import { useAutoSizeMediumModal } from '@/hooks/auto-size-modal/use-medium-modal'
import { useSessionJwt } from '@/hooks/use-session-jwt'
import { listAnggotaKelasApi } from '@/services/api/shared/anggota-kelas/list'
import cn from '@/utils/class-names'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { PiMagnifyingGlass } from 'react-icons/pi'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import { useDebounce } from 'react-use'
import { FieldError } from 'rizzui'
import AnggotaButton, { AnggotaKelasItemType } from './anggota-button'
import SelectedAnggota from './selected-anggota'

const queryKey = ['shared.anggota.list']

export type AnggotaKelasProps = {
  idKelas: string
  label?: string
  required?: boolean
  placeholder?: string
  value?: AnggotaKelasItemType
  onChange?(val?: AnggotaKelasItemType): void
  error?: string
  errorClassName?: string
  clearable?: boolean
  peran?: 'Pengajar' | 'Peserta'
}

export default function AnggotaKelas({
  idKelas,
  label,
  required,
  placeholder = 'Klik di sini untuk memilih anggota kelas',
  value,
  onChange,
  error,
  errorClassName,
  clearable,
  peran,
}: AnggotaKelasProps) {
  const { jwt } = useSessionJwt()
  const { status } = useSession()
  const size = useAutoSizeMediumModal()

  const [show, setShow] = useState(false)

  const [search, setSearch] = useState('')
  const [checkedAnggota, setCheckedAnggota] = useState<
    AnggotaKelasItemType | undefined
  >()
  const [selectedAnggota, setSelectedAnggota] = useState<
    AnggotaKelasItemType | undefined
  >(value)

  const doChange = (selected?: AnggotaKelasItemType) => {
    setSelectedAnggota(selected)

    onChange && onChange(selected)
  }

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
      const { data } = await listAnggotaKelasApi({
        jwt,
        page,
        search,
        idKelas,
        peran,
      })

      return {
        list: (data?.list ?? []).map((item) => ({
          id: item.id_peserta,
          nama: item.nama,
          email: item.email || undefined,
          foto: item.foto || undefined,
          peran: item.peran,
        })) as AnggotaKelasItemType[],
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
        Penggunaan anggota kelas mengharuskan untuk login!
      </div>
    )
  }

  const desc = peran ? peran : 'Anggota Kelas'

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
            'flex flex-wrap items-center gap-2 text-gray text-sm border border-muted cursor-pointer rounded-md transition duration-200 ring-[0.6px] ring-muted min-h-10 py-2 px-3 hover:border-primary [&_.anggota-label]:hover:text-primary',
            {
              '!border-danger [&.is-hover]:!border-danger [&.is-focus]:!border-danger !ring-danger !bg-transparent':
                error,
            }
          )}
          onClick={() => {
            setCheckedAnggota(selectedAnggota)
            refetch()
            setShow(true)
          }}
        >
          {selectedAnggota ? (
            <SelectedAnggota
              anggota={selectedAnggota}
              onRemove={clearable ? () => doChange(undefined) : undefined}
            />
          ) : (
            <Text size="sm" className="anggota text-gray-lighter">
              {placeholder}
            </Text>
          )}
        </div>

        {error && (
          <FieldError size="md" error={error} className={errorClassName} />
        )}
      </div>

      <Modal
        title={`Cari dan Pilih ${desc}`}
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
                placeholder={`Cari ${desc}`}
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
                list.map((anggota, idx) => (
                  <AnggotaButton
                    key={anggota.id + idx}
                    anggota={anggota}
                    checked={checkedAnggota?.id === anggota.id}
                    onChange={() => {
                      setCheckedAnggota(anggota)
                    }}
                  />
                ))
              ) : (
                <div className="flex items-center justify-center h-80">
                  <Text size="sm" weight="medium">
                    {search ? `${desc} tidak ditemukan` : `Belum ada ${desc}`}
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
                  doChange(checkedAnggota)
                  setShow(false)
                }}
                disabled={!checkedAnggota}
              >
                Pilih {desc}
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
