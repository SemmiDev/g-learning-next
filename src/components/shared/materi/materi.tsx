'use client'

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
  Text,
} from '@/components/ui'
import { handleActionWithToast } from '@/utils/action'
import cn from '@/utils/class-names'
import { wait } from '@/utils/wait'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import _ from 'lodash'
import { useEffect, useState } from 'react'
import { BiChevronRight } from 'react-icons/bi'
import { PiMagnifyingGlass } from 'react-icons/pi'
import { FieldError } from 'rizzui'
import KategoriButton, { KategoriItemType } from './kategori-button'
import MateriButton, { MateriItemType } from './materi-button'
import TambahKategoriModal from './modal/tambah-kategori'
import TambahMateriModal from './modal/tambah-materi'
import UbahKategoriModal from './modal/ubah-kategori'
import SelectedMateri from './selected-materi'

const queryKeyKategori = ['shared.materi.kategori']

export type MateriProps = {
  label?: string
  required?: boolean
  placeholder?: string
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
  value,
  onChange,
  error,
  errorClassName,
}: MateriProps) {
  const queryClient = useQueryClient()
  const [show, setShow] = useState(false)
  const [size, setSize] = useState<'lg' | 'xl' | 'full'>('lg')

  const [activeKategori, setActiveKategori] = useState<KategoriItemType>()
  const [searchKategori, setSearchKategori] = useState('')
  const [showModalTambahKategori, setShowModalTambahKategori] = useState(false)
  const [idLihatKategori, setIdLihatKategori] = useState<string>()
  const [idUbahKategori, setIdUbahKategori] = useState<string>()
  const [idHapusKategori, setIdHapusKategori] = useState<string>()

  const [searchMateri, setSearchMateri] = useState('')
  const [idKategoriTambah, setIdKategoriTambah] = useState<string>()
  const [idLihatMateri, setIdLihatMateri] = useState<string>()
  const [idUbahMateri, setIdUbahMateri] = useState<string>()
  const [idHapusMateri, setIdHapusMateri] = useState<string>()
  const [checkedMateriId, setCheckedMateriId] = useState<string>()
  const [selectedMateri, setSelectedMateri] = useState<
    MateriItemType | undefined
  >(value)

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

  const doChange = (selected: MateriItemType | undefined) => {
    setSelectedMateri(selected)

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
      const { data } = await listKategoriMateriAction({
        search: searchKategori,
      })

      return (data?.list ?? []).map((item) => ({
        id: item.id,
        name: item.nama_kategori,
        count: item.total_materi,
      }))
    },
  })

  const {
    data: listMateri = [],
    isLoading: isLoadingMateri,
    isFetching: isFetchingMateri,
    refetch: refetchMateri,
  } = useQuery<MateriItemType[]>({
    queryKey: ['shared.materi.list', activeKategori?.id],
    queryFn: async () => {
      if (!activeKategori?.id) return []

      const { data } = await listMateriAction({
        search: searchMateri,
        params: {
          idKategori: activeKategori?.id,
        },
      })

      return (data?.list ?? []).map((item) => ({
        id: item.bank_ajar.id,
        name: item.bank_ajar.judul,
        desc: item.bank_ajar.deskripsi,
        time: item.bank_ajar.created_at,
        fileCount: item.total_file_bank_ajar,
        fileIds: item.daftar_file_bank_ajar.map((item) => item.id),
        type: item.bank_ajar.tipe === 'Materi' ? 'materi' : 'tugas',
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
    if (searchMateri === '') {
      refetchMateri()
      return
    }

    _.debounce(refetchMateri, 250)()
  }, [searchMateri, refetchMateri])

  const handleHapusKategori = () => {
    if (!idHapusKategori) return

    handleActionWithToast(hapusKategoriMateriAction(idHapusKategori), {
      loading: 'Menghapus berkas...',
      onSuccess: () => {
        setIdHapusKategori(undefined)

        queryClient.invalidateQueries({ queryKey: queryKeyKategori })
      },
    })
  }

  return (
    <>
      <div>
        <div
          onClick={() => {
            setCheckedMateriId(selectedMateri?.id)
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
        title="Bank Materi dan Tugas"
        size={size}
        isOpen={show}
        onClose={() => setShow(false)}
        isLoading={isFetchingKategori || isFetchingMateri}
      >
        <div className="flex flex-col justify-between min-h-[calc(100vh-57px)] lg:min-h-full">
          <div className="flex flex-col min-h-[400px]">
            <div className="flex justify-between space-x-2 p-3">
              {activeKategori ? (
                <Input
                  size="sm"
                  type="search"
                  placeholder="Cari Materi"
                  clearable={true}
                  className="w-72 sm:w-96"
                  prefix={
                    <PiMagnifyingGlass
                      size={20}
                      className="text-gray-lighter"
                    />
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
              <Button
                size="sm"
                onClick={() => {
                  if (activeKategori) {
                    setIdKategoriTambah(activeKategori.id)
                  } else {
                    setShowModalTambahKategori(true)
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
                className={cn({ 'cursor-pointer': activeKategori })}
                onClick={() => {
                  activeKategori && setActiveKategori(undefined)
                  searchMateri && setSearchMateri('')
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
            <div className="flex flex-col">
              {activeKategori ? (
                isLoadingMateri || (!listMateri.length && isFetchingMateri) ? (
                  <Loader height={288} />
                ) : listMateri.length > 0 ? (
                  listMateri.map((materi) => (
                    <MateriButton
                      key={materi.id}
                      materi={materi}
                      checked={checkedMateriId === materi.id}
                      onChange={() => {
                        setCheckedMateriId(materi.id)
                      }}
                    />
                  ))
                ) : (
                  <div className="flex items-center justify-center h-72">
                    <Text size="sm" weight="medium">
                      {searchMateri
                        ? 'Materi tidak ditemukan'
                        : 'Belum ada materi'}
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
                    onEdit={(kategori) => setIdUbahKategori(kategori.id)}
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
            </div>
          </div>
          <div>
            <CardSeparator />
            <div className="flex justify-end space-x-2 p-3">
              <Button
                size="sm"
                className="w-36"
                onClick={() => {
                  const selected = listMateri.find(
                    (val) => val.id === checkedMateriId
                  )
                  doChange(selected)
                  setShow(false)
                }}
              >
                Pilih Materi
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

      <TambahKategoriModal
        showModal={showModalTambahKategori}
        setShowModal={setShowModalTambahKategori}
      />

      <TambahMateriModal
        idKategori={idKategoriTambah}
        setIdKategori={setIdKategoriTambah}
      />

      <UbahKategoriModal id={idUbahKategori} setId={setIdUbahKategori} />

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
    </>
  )
}
