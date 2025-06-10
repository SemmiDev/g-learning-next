'use client'

import {
  ActionIconTooltip,
  Button,
  FilePreviewType,
  Input,
  Label,
  Loader,
  Modal,
  ModalConfirm,
  ModalFilePreview,
  ModalFooterButtons,
  Text,
  TextSpan,
} from '@/components/ui'
import ModalInfo from '@/components/ui/modal/info'
import { GOOGLE_PICKER } from '@/config/const'
import { useAutoSizeExtraLargeModal } from '@/hooks/auto-size-modal/use-extra-large-modal'
import { useSessionJwt } from '@/hooks/use-session-jwt'
import { useShowModal } from '@/hooks/use-show-modal'
import { driveInfoApi } from '@/services/api/shared/pustaka-media/drive-info'
import { hapusBerkasApi } from '@/services/api/shared/pustaka-media/hapus'
import { listFileApi } from '@/services/api/shared/pustaka-media/list-file'
import { tambahBerkasApi } from '@/services/api/shared/pustaka-media/tambah-berkas'
import { handleActionWithToast } from '@/utils/action'
import { checkLink } from '@/utils/check-link'
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
import Link from 'next/link'
import { ReactNode, useEffect, useState } from 'react'
import useDrivePicker from 'react-google-drive-picker'
import toast from 'react-hot-toast'
import { BiChevronRight } from 'react-icons/bi'
import {
  PiFilePlusBold,
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
  googleDrive?: boolean
  external?: boolean
}

export type FolderType = {
  id: string
  name: string
}

type GoogleFileType = {
  name: string
  url: string
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
  const { jwt, processApi } = useSessionJwt()
  const [openPicker] = useDrivePicker()
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
    show: showUbahNama,
    key: keyUbahNama,
    doShow: doShowUbahNama,
    doHide: doHideUbahNama,
  } = useShowModal<string>()
  const {
    show: showUbahFile,
    key: keyUbahFile,
    doShow: doShowUbahFile,
    doHide: doHideUbahFile,
  } = useShowModal<string>()
  const [accessTokenPicker, setAccessTokenPicker] = useState<string>()
  const [newGoogleUpload, setNewGoogleUpload] = useState<GoogleFileType[]>([])
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
      const { data } = await processApi(driveInfoApi)

      const personal = data?.media_personal_info
      const instansi = data?.daftar_media_instansi_info ?? []
      const googleDrive = data?.media_google_drive_info

      setAccessTokenPicker(googleDrive?.access_token ?? undefined)

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

      const { data } = await listFileApi({
        jwt,
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
        list: (data?.list ?? []).map(
          (item) =>
            ({
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
              googleDrive: item.google_drive,
              external: item.penyimpanan === 'External',
            } as FileType)
        ),
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

  const handleHapus = async () => {
    if (!fileHapus) return

    await handleActionWithToast(processApi(hapusBerkasApi, fileHapus.id), {
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
    if (file.external) {
      if (file.googleDrive) {
        doShowUbahNama(file.id)
      } else {
        doShowUbahLink(file.id)
      }
    } else {
      doShowUbahFile(file.id)
    }
  }

  const handleOpenPicker = () => {
    openPicker({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_PICKER_CLIENT_ID ?? '',
      developerKey: process.env.NEXT_PUBLIC_GOOGLE_PICKER_DEV_KEY ?? '',
      viewId: 'DOCS',
      token: accessTokenPicker,
      showUploadView: true,
      showUploadFolders: true,
      supportDrives: true,
      multiselect: true,
      customScopes: ['https://www.googleapis.com/auth/drive.file'],
      callbackFunction: async (data) => {
        if (data.action === 'picked') {
          const shared = data.docs.filter(
            (doc) => doc.isShared || !!doc.uploadState
          )
          const notShared = data.docs.filter(
            (doc) => !doc.isShared && !doc.uploadState
          )

          let accessibleLinkCount = 0
          const form = new FormData()

          if (shared.length > 0) {
            const toastId = toast.loading(<Text>Mengecek berkas...</Text>)

            form.append('google_drive', 'true')

            for (let i = 0; i < shared.length; i++) {
              const { name, id, type, url } = shared[i]
              const accessibleLink = await checkLink(url)

              if (accessibleLink) {
                form.append(`labels_dan_links[${i}].label`, name ?? '')
                form.append(
                  `labels_dan_links[${i}].link`,
                  `https://drive.google.com/uc?id=${id}`
                )
                form.append(
                  `labels_dan_links[${i}].tipe`,
                  type === 'photo' ? 'Gambar' : 'Teks'
                )

                accessibleLinkCount++
              } else {
                notShared.push(shared[i])
              }
            }

            toast.dismiss(toastId)
          }

          if (accessibleLinkCount > 0) {
            await handleActionWithToast(processApi(tambahBerkasApi, form), {
              loading: 'Menggunggah...',
              onSuccess: () => {
                queryClient.invalidateQueries({ queryKey })
              },
            })
          }

          setNewGoogleUpload(notShared)
        }
      },
    })
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
        containerClassName="max-h-dvh"
      >
        <div className="flex flex-col justify-between flex-1 min-h-0 xl:min-h-full">
          <div className="grid grid-cols-3 min-h-[400px]">
            <div className="flex flex-col col-span-3 lg:col-span-1 lg:border-r lg:border-r-gray-100">
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
            <div className="flex flex-col overflow-y-auto relative col-span-3 lg:col-span-2">
              {activeDrive !== undefined && (
                <>
                  <div className="flex justify-between items-center gap-x-2 bg-white sticky top-0 p-3 z-10">
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
                        tooltip={
                          activeDrive === 'GOOGLE_DRIVE' && GOOGLE_PICKER
                            ? 'Tambah dari Google Drive'
                            : `${
                                activeDrive !== 'GOOGLE_DRIVE'
                                  ? 'Tambah Link/'
                                  : ''
                              }Unggah Media`
                        }
                        size="sm"
                        onClick={() => {
                          if (activeDrive === 'GOOGLE_DRIVE' && GOOGLE_PICKER) {
                            handleOpenPicker()
                          } else {
                            setShowTambahBerkas(true)
                          }
                        }}
                      >
                        {activeDrive === 'GOOGLE_DRIVE' && GOOGLE_PICKER ? (
                          <PiFilePlusBold />
                        ) : (
                          <PiUploadSimpleBold />
                        )}
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
                    <Button
                      fontWeight="semibold"
                      variant="text"
                      className="text-gray-dark h-auto p-0"
                      title={currentDrive.name}
                      onClick={() => {
                        setActiveDrive(currentDrive.id)
                        setActiveFolder(undefined)
                        setListFolder([])
                      }}
                    >
                      {activeDrive === 'GOOGLE_DRIVE'
                        ? 'Google Drive'
                        : currentDrive.name}
                    </Button>
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
                  <div className="flex flex-col lg:h-[calc(100dvh-206px)] xl:max-h-[400px]">
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
                            onDelete={(file) => {
                              if (file.fileCount && file.fileCount > 0) {
                                toast.error(
                                  <Text>
                                    Tidak bisa menghapus folder yang memiliki
                                    berkas. Silahkan gunakan menu pustaka media.
                                  </Text>
                                )
                                return
                              }

                              setFileHapus(file)
                            }}
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
                                image: file.type === 'image',
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

          <ModalFooterButtons
            size="sm"
            onCancel={() => setShow(false)}
            borderTop
          >
            <div className="flex-1">
              <Button
                size="sm"
                className="w-full"
                onClick={() => {
                  const selected = [...checkedFiles]
                  doChange(selected)
                  setShow(false)
                }}
                disabled={!checkedFiles.length}
              >
                Pilih Berkas
              </Button>
            </div>
          </ModalFooterButtons>
        </div>
      </Modal>

      <TambahFolderModal
        show={showTambahFolder}
        setShow={setShowTambahFolder}
        refetchKey={queryKey}
        googleDrive={activeDrive === 'GOOGLE_DRIVE'}
        idInstansi={idInstansi}
        idFolder={activeFolder}
      />

      <TambahBerkasModal
        show={showTambahBerkas}
        setShow={setShowTambahBerkas}
        refetchKeys={[queryKey, ['shared.pustaka-media.drives']]}
        googleDrive={activeDrive === 'GOOGLE_DRIVE'}
        idInstansi={idInstansi}
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

      <UbahLinkModal
        show={showUbahNama}
        id={keyUbahNama}
        onHide={doHideUbahNama}
        refetchKey={queryKey}
        googleDrive
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

      <ModalInfo
        title="Status Publikasi Berkas"
        color="warning"
        size="md"
        isOpen={newGoogleUpload.length > 0}
        onClose={() => setNewGoogleUpload([])}
      >
        <div className="flex flex-col gap-2 p-3">
          <Text weight="medium" variant="dark" align="center">
            Tidak dapat menambahkan berkas dengan status belum terpublikasi
            (sharing dengan semua orang). Pastikan status sudah terpublikasi
            terlebih dahulu di akun Google Drive anda.
          </Text>
          <ul className="text-base font-semibold list-disc list-inside space-y-0.5">
            {newGoogleUpload.map((file, idx) => (
              <li key={idx}>
                <Link href={file.url} target="_blank" className="text-primary">
                  {file.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </ModalInfo>
    </>
  )
}
