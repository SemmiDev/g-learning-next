'use client'

import { listPaketSoalAction } from '@/actions/shared/paket-soal/list'
import { listKategoriSoalAction } from '@/actions/shared/paket-soal/list-kategori'
import {
  Button,
  CardSeparator,
  Input,
  Label,
  Loader,
  Modal,
  Text,
} from '@/components/ui'
import { useShowModal } from '@/hooks/use-show-modal'
import cn from '@/utils/class-names'
import { useQuery } from '@tanstack/react-query'
import _ from 'lodash'
import { useEffect, useState } from 'react'
import { BiChevronRight } from 'react-icons/bi'
import { PiMagnifyingGlass } from 'react-icons/pi'
import { FieldError } from 'rizzui'
import KategoriButton, { KategoriItemType } from './kategori-button'
import LihatSoalModal from './modal/lihat-paket-soal'
import UbahKategoriModal from './modal/ubah-kategori'
import UbahSoalModal from './modal/ubah-paket-soal'
import SoalButton, { PaketSoalItemType } from './paket-soal-button'
import SelectedSoal from './selected-paket-soal'

const queryKeyKategori = ['shared.paket-soal.kategori']

export type PaketSoalProps = {
  label?: string
  required?: boolean
  placeholder?: string
  value?: PaketSoalItemType
  onChange?(val?: PaketSoalItemType): void
  multiple?: boolean
  error?: string
  errorClassName?: string
}

export default function PaketSoal({
  label,
  required,
  placeholder = 'Klik di sini untuk memilih dari bank soal',
  value,
  onChange,
  error,
  errorClassName,
}: PaketSoalProps) {
  const [show, setShow] = useState(false)
  const [size, setSize] = useState<'lg' | 'xl' | 'full'>('lg')

  const [activeKategori, setActiveKategori] = useState<KategoriItemType>()
  const [searchKategori, setSearchKategori] = useState('')
  const {
    show: showUbahKategori,
    key: keyUbahKategori,
    doShow: doShowUbahKategori,
    doHide: doHideUbahKategori,
  } = useShowModal<string>()

  const [searchSoal, setSearchSoal] = useState('')
  const {
    show: showLihatSoal,
    key: keyLihatSoal,
    doShow: doShowLihatSoal,
    doHide: doHideLihatSoal,
  } = useShowModal<string>()
  const {
    show: showUbahSoal,
    key: keyUbahSoal,
    doShow: doShowUbahSoal,
    doHide: doHideUbahSoal,
  } = useShowModal<string>()
  const [checkedSoal, setCheckedSoal] = useState<PaketSoalItemType>()
  const [selectedSoal, setSelectedSoal] = useState<
    PaketSoalItemType | undefined
  >(value)

  const queryKeySoal = ['shared.paket-soal.list', activeKategori?.id]

  const handleResize = () => {
    if (window.innerWidth < 1024) {
      setSize('full')
    } else if (window.innerWidth < 1280) {
      setSize('xl')
    } else {
      setSize('lg')
    }
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    handleResize()
  }, [])

  const doChange = (selected: PaketSoalItemType | undefined) => {
    setSelectedSoal(selected)

    onChange && onChange(selected)
  }

  const {
    data: listKategori = [],
    isLoading: isLoadingKategori,
    isFetching: isFetchingKategori,
    refetch: refetchKategori,
  } = useQuery<KategoriItemType[]>({
    queryKey: queryKeyKategori,
    queryFn: async () => {
      const { data } = await listKategoriSoalAction({
        search: searchKategori,
      })

      return (data?.list ?? []).map((item) => ({
        id: item.id,
        name: item.nama_kategori,
        count: item.total_bank_soal,
      }))
    },
  })

  const {
    data: listSoal = [],
    isLoading: isLoadingSoal,
    isFetching: isFetchingSoal,
    refetch: refetchSoal,
  } = useQuery<PaketSoalItemType[]>({
    queryKey: queryKeySoal,
    queryFn: async () => {
      if (!activeKategori?.id) return []

      const { data } = await listPaketSoalAction({
        search: searchSoal,
        params: {
          idKategori: activeKategori?.id,
        },
      })

      return (data?.list ?? []).map((item) => ({
        id: item.id,
        name: item.judul,
        desc: item.deskripsi,
        time: item.created_at,
        count: item.total_soal,
      }))
    },
  })

  useEffect(() => {
    if (searchKategori === '') {
      refetchKategori()
      return
    }

    _.debounce(refetchKategori, 250)()
  }, [searchKategori, refetchKategori])

  useEffect(() => {
    if (searchSoal === '') {
      refetchSoal()
      return
    }

    _.debounce(refetchSoal, 250)()
  }, [searchSoal, refetchSoal])

  return (
    <>
      <div>
        <div
          onClick={() => {
            setCheckedSoal(selectedSoal)
            setShow(true)
            refetchKategori()
          }}
        >
          {label && (
            <label className="text-gray-dark font-semibold mb-1.5 block">
              <Label label={label} required={required} />
            </label>
          )}
          <div
            className={cn(
              'flex flex-wrap items-center gap-2 text-gray text-sm border border-muted cursor-pointer rounded-md transition duration-200 ring-[0.6px] ring-muted min-h-10 py-2 px-[0.875rem] hover:border-primary [&_.soal-label]:hover:text-primary',
              {
                '!border-danger [&.is-hover]:!border-danger [&.is-focus]:!border-danger !ring-danger !bg-transparent':
                  error,
              }
            )}
          >
            {selectedSoal && (
              <SelectedSoal
                soal={selectedSoal}
                onRemove={() => {
                  doChange(undefined)
                }}
              />
            )}
            <Text size="sm" className="soal text-gray-lighter">
              {placeholder}
            </Text>
          </div>
        </div>
        {error && (
          <FieldError size="md" error={error} className={errorClassName} />
        )}
      </div>

      <Modal
        title="Paket Soal"
        size={size}
        isOpen={show}
        onClose={() => setShow(false)}
        isLoading={isFetchingKategori || isFetchingSoal}
      >
        <div className="flex flex-col justify-between min-h-[calc(100vh-57px)] lg:min-h-full">
          <div className="flex flex-col min-h-[400px]">
            <div className="flex p-3">
              {activeKategori ? (
                <Input
                  size="sm"
                  type="search"
                  placeholder="Cari Soal"
                  clearable={true}
                  className="w-72 sm:w-96"
                  prefix={
                    <PiMagnifyingGlass
                      size={20}
                      className="text-gray-lighter"
                    />
                  }
                  value={searchSoal}
                  onChange={(e) => setSearchSoal(e.target.value)}
                  onClear={() => setSearchSoal('')}
                />
              ) : (
                <Input
                  size="sm"
                  type="search"
                  placeholder="Cari Kategori"
                  clearable={true}
                  className="w-72 sm:w-96"
                  prefix={
                    <PiMagnifyingGlass
                      size={20}
                      className="text-gray-lighter"
                    />
                  }
                  value={searchKategori}
                  onChange={(e) => setSearchKategori(e.target.value)}
                  onClear={() => setSearchKategori('')}
                />
              )}
            </div>
            <div className="flex items-center border-b border-b-gray-100 px-3 pb-3">
              <Text
                weight="medium"
                variant="dark"
                className={cn({ 'select-none cursor-pointer': activeKategori })}
                onClick={() => {
                  activeKategori && setActiveKategori(undefined)
                  searchSoal && setSearchSoal('')
                  refetchKategori()
                }}
              >
                Bank Soal
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
            <div className="flex flex-col">
              {activeKategori ? (
                isLoadingSoal || (!listSoal.length && isFetchingSoal) ? (
                  <Loader height={288} />
                ) : listSoal.length > 0 ? (
                  listSoal.map((soal) => (
                    <SoalButton
                      key={soal.id}
                      soal={soal}
                      onDetail={(soal) => doShowLihatSoal(soal.id)}
                      onEdit={(soal) => doShowUbahSoal(soal.id)}
                      checked={checkedSoal?.id === soal.id}
                      onChange={() => {
                        setCheckedSoal(soal)
                      }}
                    />
                  ))
                ) : (
                  <div className="flex items-center justify-center h-72">
                    <Text size="sm" weight="medium">
                      {searchSoal ? 'Soal tidak ditemukan' : 'Belum ada soal'}
                    </Text>
                  </div>
                )
              ) : isLoadingKategori ||
                (!listKategori.length && isFetchingKategori) ? (
                <Loader height={288} />
              ) : listKategori.length > 0 ? (
                listKategori.map((kategori) => (
                  <KategoriButton
                    key={kategori.id}
                    kategori={kategori}
                    onOpen={(kategori) => setActiveKategori(kategori)}
                    onEdit={(kategori) => doShowUbahKategori(kategori.id)}
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
            </div>
          </div>
          <div>
            <CardSeparator />
            <div className="flex justify-end space-x-2 p-3">
              <Button
                size="sm"
                className="w-36"
                onClick={() => {
                  doChange(checkedSoal)
                  setShow(false)
                }}
                disabled={!checkedSoal}
              >
                Pilih Paket Soal
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

      <UbahKategoriModal
        show={showUbahKategori}
        id={keyUbahKategori}
        onHide={doHideUbahKategori}
      />

      <UbahSoalModal
        idKategori={activeKategori?.id}
        show={showUbahSoal}
        id={keyUbahSoal}
        onHide={doHideUbahSoal}
      />

      <LihatSoalModal
        show={showLihatSoal}
        id={keyLihatSoal}
        onHide={doHideLihatSoal}
      />
    </>
  )
}
