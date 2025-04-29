'use client'

import { driveInfoAction } from '@/actions/shared/pustaka-media/drive-info'
import { hapusBerkasAction } from '@/actions/shared/pustaka-media/hapus'
import { listFileAction } from '@/actions/shared/pustaka-media/list-file'
import { tambahBerkasAction } from '@/actions/shared/pustaka-media/tambah-berkas'
import {
  ActionIconTooltip,
  Button,
  CardSeparator,
  FilePreviewType,
  Input,
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
import {
  getFileCount,
  getFileIsFolder,
  getFileSize,
  getFileType,
} from '@/utils/file-properties-from-api'
import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import useDrivePicker from 'react-google-drive-picker'
import toast from 'react-hot-toast'
import { BiChevronRight } from 'react-icons/bi'
import {
  PiFilePlusBold,
  PiFolderPlusFill,
  PiMagnifyingGlass,
  PiUploadSimpleBold,
} from 'react-icons/pi'
import { useDebounce } from 'react-use'
import DriveButton from './drive-button'
import FileButton from './file-button'
import FolderButton from './folder-button'
import TambahBerkasModal from './modal/tambah-berkas'
import TambahFolderModal from './modal/tambah-folder'
import UbahBerkasModal from './modal/ubah-berkas'
import UbahFolderModal from './modal/ubah-folder'
import UbahLinkModal from './modal/ubah-link'
import { DriveType, FileType, FolderType } from './pustaka-media'
import useInfiniteScroll from 'react-infinite-scroll-hook'

const queryKeyDrive = ['shared.pustaka-media.drives']

export type PilihMediaProps = {
  show: boolean
  setShow: (show: boolean) => void
  onSelect?(val: FileType): void
}

export default function PilihMediaGambar({
  show = false,
  setShow,
  onSelect,
}: PilihMediaProps) {
  const [openPicker] = useDrivePicker()
  const { status } = useSession()
  const queryClient = useQueryClient()
  const size = useAutoSizeExtraLargeModal()
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
  const [previewFile, setPreviewFile] = useState<FilePreviewType>()
  const [checkedFile, setCheckedFile] = useState<FileType>()

  const { data: drives = [], isFetching: isFetchingDrives } = useQuery<
    DriveType[]
  >({
    queryKey: queryKeyDrive,
    queryFn: async () => {
      const { data } = await driveInfoAction()

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

  const idInstansi =
    activeDrive !== 'PERSONAL' && activeDrive !== 'GOOGLE_DRIVE'
      ? activeDrive
      : undefined

  const queryKey = [
    'shared.pustaka-media.files',
    activeDrive === undefined
      ? 'none'
      : activeDrive === null
      ? 'personal'
      : activeDrive,
    activeFolder ?? 'all',
  ]

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
        jenis: 'Folder,Gambar',
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
          console.log(data.docs)
          const shared = data.docs.filter((doc) => doc.isShared)
          const notShared = data.docs.filter((doc) => !doc.isShared)

          if (notShared.length > 0) {
            toast.error(
              `Status ${notShared
                .map((doc) => doc.name)
                .join(
                  ', '
                )} belum terpublikasi (sharing dengan semua orang), silahkan aktifkan publikasi terlebih dahulu di akun Google Drive anda.`
            )
          }

          if (shared.length > 0) {
            const form = new FormData()
            form.append('google_drive', 'true')

            for (let i = 0; i < shared.length; i++) {
              const { name, id } = shared[i]
              form.append(`labels_dan_links[${i}].label`, name ?? '')
              form.append(
                `labels_dan_links[${i}].link`,
                `https://drive.google.com/uc?id=${id}`
              )
            }

            await handleActionWithToast(tambahBerkasAction(form), {
              loading: 'Menggunggah...',
              onSuccess: () => {
                queryClient.invalidateQueries({ queryKey })
              },
            })
          }
        }
      },
    })
  }

  if (status === 'unauthenticated') {
    return null
  }

  return (
    <>
      <Modal
        title="Pustaka Media"
        size={size}
        isOpen={show}
        onClose={() => setShow(false)}
        isLoading={isFetchingDrives || isFetchingFiles}
      >
        <div className="flex flex-col justify-between flex-1 min-h-[calc(100vh-57px)] xl:min-h-full">
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
            <div className="flex flex-col col-span-3 lg:col-span-2">
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
                        tooltip={
                          activeDrive === 'GOOGLE_DRIVE' &&
                          process.env.NEXT_PUBLIC_GOOGLE_DRIVE_PICKER === 'true'
                            ? 'Tambah dari Google Drive'
                            : `${
                                activeDrive !== 'GOOGLE_DRIVE'
                                  ? 'Tambah Link/'
                                  : ''
                              }Unggah Media`
                        }
                        size="sm"
                        onClick={() => {
                          if (
                            activeDrive === 'GOOGLE_DRIVE' &&
                            process.env.NEXT_PUBLIC_GOOGLE_DRIVE_PICKER ===
                              'true'
                          ) {
                            handleOpenPicker()
                          } else {
                            setShowTambahBerkas(true)
                          }
                        }}
                      >
                        {activeDrive === 'GOOGLE_DRIVE' &&
                        process.env.NEXT_PUBLIC_GOOGLE_DRIVE_PICKER ===
                          'true' ? (
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
                              })
                            }}
                            checked={checkedFile?.id === file.id}
                            onChange={() => {
                              setCheckedFile(file)
                            }}
                            multiple={false}
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
                  onSelect && checkedFile && onSelect(checkedFile)
                  setCheckedFile(undefined)
                  setShow(false)
                }}
                disabled={!checkedFile}
              >
                Pilih Gambar
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
        idInstansi={activeDrive ?? undefined}
        idFolder={activeFolder}
      />

      <TambahBerkasModal
        show={showTambahBerkas}
        setShow={setShowTambahBerkas}
        refetchKeys={[queryKey, ['shared.pustaka-media.drives']]}
        idInstansi={activeDrive ?? undefined}
        idFolder={activeFolder}
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
    </>
  )
}
