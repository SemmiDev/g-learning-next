'use client'

import { driveInfoAction } from '@/actions/shared/pustaka-media/drive-info'
import { hapusBerkasAction } from '@/actions/shared/pustaka-media/hapus'
import { listFileAction } from '@/actions/shared/pustaka-media/list-file'
import {
  ActionIconTooltip,
  Button,
  CardSeparator,
  FilePreviewType,
  Input,
  Label,
  Loader,
  Modal,
  ModalConfirm,
  ModalFilePreview,
  Text,
  TextSpan,
} from '@/components/ui'
import { useAutoSizeExtraLargeModal } from '@/hooks/auto-size-modal/use-extra-large-modal'
import { useShowModal } from '@/hooks/use-show-modal'
import { handleActionWithToast } from '@/utils/action'
import cn from '@/utils/class-names'
import {
  getFileCount,
  getFileIsFolder,
  getFileSize,
  getFileType,
} from '@/utils/file-properties-from-api'
import { removeFromListWhere } from '@/utils/list'
import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { ReactNode, useEffect, useState } from 'react'
import { BiChevronRight } from 'react-icons/bi'
import {
  PiFolderPlusFill,
  PiMagnifyingGlass,
  PiUploadSimpleBold,
} from 'react-icons/pi'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import { useDebounce } from 'react-use'
import { FieldError } from 'rizzui'
import DriveButton from './drive-button'
import FileButton from './file-button'
import FolderButton from './folder-button'
import TambahBerkasModal from './modal/tambah-berkas'
import TambahFolderModal from './modal/tambah-folder'
import UbahBerkasModal from './modal/ubah-berkas'
import UbahFolderModal from './modal/ubah-folder'
import UbahLinkModal from './modal/ubah-link'
import SelectedFile from './selected-file'

export type DriveType = {
  id: string
  name: string
  used: number
  size: number
  instansi?: boolean
  active?: boolean
}

const fileTypes = [
  'image',
  'audio',
  'video',
  'other',
  'folder',
  'link',
] as const
type FileTypesType = (typeof fileTypes)[number]

export type FileType = {
  id: string
  name: string
  folder: boolean
  extension?: string
  fileCount?: number
  size?: number
  time: string
  type?: FileTypesType
  link?: string
  driveId?: string
}

export type FolderType = {
  id: string
  name: string
}

const queryKeyDrive = ['shared.pustaka-media.drives']

export type PustakaMediaProps = {
  label?: ReactNode
  required?: boolean
  placeholder?: string
  value?: FileType | FileType[]
  onChange?(val: FileType | FileType[]): void
  multiple?: boolean
  error?: string
  errorClassName?: string
  types?: FileTypesType[]
  hideSelected?: boolean
  children?: ReactNode
}

export default function PustakaMedia({
  label,
  required,
  placeholder = 'Klik di sini untuk memilih dari pustaka media',
  value,
  onChange,
  multiple = false,
  error,
  errorClassName,
  types,
  hideSelected = false,
  children,
}: PustakaMediaProps) {
  const { status } = useSession()
  const queryClient = useQueryClient()
  const size = useAutoSizeExtraLargeModal()
  const [show, setShow] = useState(false)
  const [activeDrive, setActiveDrive] = useState<string>()
  const [activeFolder, setActiveFolder] = useState<string>()
  const [search, setSearch] = useState('')
  const [listFolder, setListFolder] = useState<FolderType[]>([])
  const [fileHapus, setFileHapus] = useState<FileType>()
  const [showTambahFolder, setShowTambahFolder] = useState(false)
  const [showTambahBerkas, setShowTambahBerkas] = useState(false)
  const {
    show: showUbahFolder,
    key: keyUbahFolder,
    doShow: doShowUbahFolder,
    doHide: doHideUbahFolder,
  } = useShowModal<string>()
  const {
    show: showUbahLink,
    key: keyUbahLink,
    doShow: doShowUbahLink,
    doHide: doHideUbahLink,
  } = useShowModal<string>()
  const {
    show: showUbahFile,
    key: keyUbahFile,
    doShow: doShowUbahFile,
    doHide: doHideUbahFile,
  } = useShowModal<string>()
  const [previewFile, setPreviewFile] = useState<FilePreviewType>()
  const [checkedFiles, setCheckedFiles] = useState<FileType[]>([])
  const [selectedFiles, setSelectedFiles] = useState<FileType[]>(
    Array.isArray(value) ? value : value ? [value] : []
  )

  useEffect(() => {
    setSelectedFiles(Array.isArray(value) ? value : value ? [value] : [])
  }, [value])

  const doChange = (selected: FileType[]) => {
    setSelectedFiles(selected)

    onChange && onChange(multiple === true ? selected : selected[0])
  }

  const {
    data: drives = [],
    refetch: refetchDrives,
    isFetching: isFetchingDrives,
  } = useQuery<DriveType[]>({
    queryKey: queryKeyDrive,
    queryFn: async () => {
      const { data } = await driveInfoAction()

      const personal = data?.media_personal_info
      const instansi = data?.daftar_media_instansi_info ?? []
      const googleDrive = data?.media_google_drive_info

      return [
        {
          id: 'PERSONAL',
          name: 'Penyimpanan Personal',
          size: personal?.kuota_total_in_kb ?? 0,
          used: personal?.kuota_terpakai_in_kb ?? 0,
        },
        ...instansi.map((item) => ({
          id: item.id_instansi,
          name: `Penyimpanan ${item.nama_instansi}`,
          size: item.kuota_total_in_kb,
          used: item.kuota_terpakai_in_kb,
          instansi: true,
        })),
        {
          id: 'GOOGLE_DRIVE',
          name: googleDrive?.email ?? '',
          size: googleDrive?.kuota_total_in_kb ?? 0,
          used: googleDrive?.kuota_terpakai_in_kb ?? 0,
          active: !!googleDrive,
        },
      ]
    },
  })

  const queryKey = [
    'shared.pustaka-media.files',
    activeDrive === undefined ? 'all' : activeDrive,
    activeFolder ?? 'all',
  ]

  const idInstansi =
    activeDrive !== 'PERSONAL' && activeDrive !== 'GOOGLE_DRIVE'
      ? activeDrive
      : undefined

  const {
    data: dataFiles,
    isLoading: isLoadingFiles,
    isFetching: isFetchingFiles,
    refetch: refetchFiles,
    hasNextPage: hasNextPageFiles,
    fetchNextPage: fetchNextPageFiles,
  } = useInfiniteQuery({
    queryKey,
    queryFn: async ({ pageParam: page }) => {
      if (activeDrive === undefined) {
        return { list: [] }
      }

      const { data } = await listFileAction({
        personal: activeDrive === 'PERSONAL',
        googleDrive: activeDrive === 'GOOGLE_DRIVE',
        idInstansi,
        idFolder: activeFolder,
        page,
        search,
        sort: {
          name: 'nama',
          order: 'asc',
        },
        jenis: types
          ? types
              ?.map((type) => {
                switch (type) {
                  case 'audio':
                    return 'Audio'
                  case 'video':
                    return 'Video'
                  case 'image':
                    return 'Gambar'
                  case 'link':
                    return 'Teks'
                  case 'folder':
                    return 'Folder'
                  default:
                    return 'Dokumen'
                }
              })
              .join(',')
          : undefined,
      })

      return {
        list: (data?.list ?? []).map((item) => ({
          id: item.id,
          name: item.nama,
          time: item.created_at,
          link: item.url,
          extension: item.ekstensi,
          folder: getFileIsFolder(item),
          fileCount: getFileCount(item),
          size: getFileSize(item),
          type: getFileType(item),
          driveId: item.id_instansi ?? undefined,
        })) as FileType[],
        pagination: data?.pagination,
      }
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.pagination?.hasNextPage
        ? (lastPage.pagination?.page ?? 1) + 1
        : undefined,
  })

  const files = dataFiles?.pages.flatMap((page) => page.list) || []

  const currentDrive = drives.filter((item) => item.id === activeDrive)[0]

  const [refSentry] = useInfiniteScroll({
    loading: isLoadingFiles,
    hasNextPage: hasNextPageFiles,
    onLoadMore: fetchNextPageFiles,
  })

  useDebounce(() => refetchFiles(), search ? 250 : 0, [refetchFiles, search])

  const handleHapus = () => {
    if (!fileHapus) return

    handleActionWithToast(hapusBerkasAction(fileHapus.id), {
      loading: 'Menghapus berkas...',
      success: `Berhasil menghapus ${fileHapus.folder ? 'folder' : 'berkas'}`,
      onSuccess: () => {
        setFileHapus(undefined)

        queryClient.invalidateQueries({ queryKey })
        queryClient.invalidateQueries({ queryKey: queryKeyDrive })
      },
    })
  }

  const handleUbah = (file: FileType) => {
    if (file.type === 'link') {
      doShowUbahLink(file.id)
    } else {
      doShowUbahFile(file.id)
    }
  }

  if (status === 'unauthenticated') {
    return (
      <div className="text-danger text-sm font-semibold border border-danger rounded-md ring-[0.6px] ring-muted min-h-10 uppercase py-2 px-[0.875rem]">
        Penggunaan pustaka media mengharuskan untuk login!
      </div>
    )
  }

  return (
    <>
      <div>
        <div
          onClick={() => {
            setCheckedFiles([...selectedFiles])
            refetchDrives()
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
              'flex flex-wrap items-center gap-2 text-gray text-sm border border-muted cursor-pointer rounded-md transition duration-200 ring-[0.6px] ring-muted min-h-10 py-2 px-[0.875rem] hover:border-primary [&_.pustaka-media-label]:hover:text-primary',
              {
                '!border-danger [&.is-hover]:!border-danger [&.is-focus]:!border-danger !ring-danger !bg-transparent':
                  error,
              }
            )}
          >
            {!hideSelected &&
              selectedFiles.length > 0 &&
              selectedFiles.map((file) => (
                <SelectedFile
                  key={file.id}
                  file={file}
                  onRemove={() => {
                    const selected = removeFromListWhere(
                      selectedFiles,
                      (item) => item.id === file.id
                    )
                    doChange(selected)
                  }}
                />
              ))}
            {children || (
              <Text size="sm" className="pustaka-media-label text-gray-lighter">
                {placeholder}
              </Text>
            )}
          </div>
        </div>
        {error && (
          <FieldError size="md" error={error} className={errorClassName} />
        )}
      </div>

      <Modal
        title="Pustaka Media"
        size={size}
        isOpen={show}
        onClose={() => setShow(false)}
        isLoading={isFetchingDrives || isFetchingFiles}
      >
        <div className="flex flex-col justify-between min-h-[calc(100vh-57px)] xl:min-h-full">
          <div className="flex flex-col min-h-[400px] lg:flex-row">
            <div className="flex flex-col lg:w-4/12 lg:border-r lg:border-r-gray-100">
              {drives.map((drive) => (
                <DriveButton
                  key={drive.id}
                  drive={drive}
                  active={activeDrive === drive.id}
                  onClick={() => {
                    setActiveDrive(drive.id)
                    setActiveFolder(undefined)
                    setListFolder([])
                  }}
                />
              ))}
            </div>
            <div className="flex flex-col flex-1">
              {activeDrive !== undefined && (
                <>
                  <div className="flex justify-between items-center gap-x-2 p-3">
                    <Input
                      size="sm"
                      type="search"
                      placeholder="Cari Berkas"
                      clearable
                      className="w-72 sm:w-96"
                      prefix={
                        <PiMagnifyingGlass
                          size={20}
                          className="text-gray-lighter"
                        />
                      }
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      onClear={() => setSearch('')}
                    />
                    <div className="flex gap-x-1">
                      <ActionIconTooltip
                        tooltip="Tambah Link/Unggah Media"
                        size="sm"
                        onClick={() => setShowTambahBerkas(true)}
                      >
                        <PiUploadSimpleBold />
                      </ActionIconTooltip>
                      <ActionIconTooltip
                        tooltip="Tambah Folder"
                        size="sm"
                        onClick={() => setShowTambahFolder(true)}
                      >
                        <PiFolderPlusFill />
                      </ActionIconTooltip>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center border-b border-b-gray-100 px-3 pb-3">
                    <Text
                      weight="medium"
                      variant="dark"
                      title={currentDrive.name}
                    >
                      {activeDrive === 'GOOGLE_DRIVE'
                        ? 'Google Drive'
                        : currentDrive.name}
                    </Text>
                    {listFolder.length > 0 &&
                      listFolder.map((folder, idx) => (
                        <div key={folder.id} className="flex items-center">
                          <BiChevronRight size={18} className="mx-1" />
                          {idx === listFolder.length - 1 ? (
                            <TextSpan
                              size="sm"
                              weight="semibold"
                              color="gray"
                              variant="dark"
                            >
                              {folder.name}
                            </TextSpan>
                          ) : (
                            <Button
                              fontWeight="semibold"
                              variant="text"
                              className="text-gray-dark h-auto p-0"
                              onClick={() => {
                                setActiveFolder(folder.id)
                                setListFolder((list) => [
                                  ...list.slice(0, idx + 1),
                                ])
                              }}
                            >
                              {folder.name}
                            </Button>
                          )}
                        </div>
                      ))}
                  </div>
                  <div className="flex flex-col overflow-y-auto lg:h-[calc(100dvh-206px)] xl:max-h-[400px]">
                    {isLoadingFiles || (!files.length && isFetchingFiles) ? (
                      <Loader height={320} />
                    ) : files.length > 0 ? (
                      files.map((file) =>
                        file.folder ? (
                          <FolderButton
                            key={file.id}
                            file={file}
                            onOpen={(file) => {
                              setActiveFolder(file.id)
                              setListFolder((list) => [
                                ...list,
                                {
                                  name: file.name,
                                  id: file.id,
                                },
                              ])
                            }}
                            onEdit={(file) => doShowUbahFolder(file.id)}
                            onDelete={(file) => setFileHapus(file)}
                          />
                        ) : (
                          <FileButton
                            key={file.id}
                            file={file}
                            onEdit={handleUbah}
                            onDelete={(file) => setFileHapus(file)}
                            onPreview={(file) => {
                              if (!file.link) return

                              setPreviewFile({
                                url: file.link,
                                extension: file.extension,
                              })
                            }}
                            checked={checkedFiles.some(
                              (item) => item.id === file.id
                            )}
                            onChange={(val) => {
                              if (multiple) {
                                if (val) {
                                  setCheckedFiles([...checkedFiles, file])
                                } else {
                                  setCheckedFiles(
                                    removeFromListWhere(
                                      checkedFiles,
                                      (item) => item.id === file.id
                                    )
                                  )
                                }
                              } else {
                                setCheckedFiles([file])
                              }
                            }}
                            multiple={multiple}
                          />
                        )
                      )
                    ) : (
                      <div className="flex items-center justify-center h-80">
                        <Text size="sm" weight="medium">
                          {search
                            ? 'Berkas tidak ditemukan'
                            : 'Belum ada berkas'}
                        </Text>
                      </div>
                    )}
                    {!isLoadingFiles && hasNextPageFiles && (
                      <Loader ref={refSentry} size="sm" className="py-4" />
                    )}
                  </div>
                </>
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
                  const selected = [...checkedFiles]
                  doChange(selected)
                  setShow(false)
                }}
                disabled={!checkedFiles.length}
              >
                Pilih Berkas
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

      <TambahFolderModal
        show={showTambahFolder}
        setShow={setShowTambahFolder}
        refetchKey={queryKey}
        googleDrive={activeDrive === 'GOOGLE_DRIVE'}
        idInstansi={activeDrive ?? undefined}
        idFolder={activeFolder}
      />

      <TambahBerkasModal
        show={showTambahBerkas}
        setShow={setShowTambahBerkas}
        refetchKeys={[queryKey, ['shared.pustaka-media.drives']]}
        googleDrive={activeDrive === 'GOOGLE_DRIVE'}
        idInstansi={activeDrive ?? undefined}
        idFolder={activeFolder}
        uploadLink={
          (!types || (!!types && types?.includes('link'))) &&
          activeDrive !== 'GOOGLE_DRIVE'
        }
      />

      <UbahFolderModal
        show={showUbahFolder}
        id={keyUbahFolder}
        onHide={doHideUbahFolder}
        refetchKeys={[queryKey, ['shared.pustaka-media.drives']]}
      />

      <UbahLinkModal
        show={showUbahLink}
        id={keyUbahLink}
        onHide={doHideUbahLink}
        refetchKey={queryKey}
      />

      <UbahBerkasModal
        show={showUbahFile}
        id={keyUbahFile}
        onHide={doHideUbahFile}
        refetchKey={queryKey}
        alert={activeDrive !== 'GOOGLE_DRIVE'}
      />

      <ModalFilePreview
        file={previewFile}
        onClose={() => setPreviewFile(undefined)}
      />

      <ModalConfirm
        title={`Hapus Berkas`}
        desc={`Apakah Anda yakin ingin menghapus ${
          fileHapus?.folder ? 'folder' : 'berkas'
        } ini?`}
        color="danger"
        isOpen={!!fileHapus}
        onClose={() => setFileHapus(undefined)}
        onConfirm={handleHapus}
        headerIcon="help"
        closeOnCancel
      />
    </>
  )
}
