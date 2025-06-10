'use client'

import {
  Button,
  Card,
  FilePreviewType,
  Loader,
  ModalConfirm,
  ModalFilePreview,
  PustakaMediaDriveType,
  PustakaMediaFileType,
  PustakaMediaFolderType,
  Shimmer,
  Text,
  TextSpan,
  Title,
} from '@/components/ui'
import ModalInfo from '@/components/ui/modal/info'
import { GOOGLE_PICKER } from '@/config/const'
import { useSessionJwt } from '@/hooks/use-session-jwt'
import { useShowModal } from '@/hooks/use-show-modal'
import { driveInfoApi } from '@/services/api/shared/pustaka-media/drive-info'
import { hapusBerkasApi } from '@/services/api/shared/pustaka-media/hapus'
import { listFileApi } from '@/services/api/shared/pustaka-media/list-file'
import { tambahBerkasApi } from '@/services/api/shared/pustaka-media/tambah-berkas'
import { unlinkGoogleDriveApi } from '@/services/api/shared/pustaka-media/unlink-google-drive'
import { handleActionWithToast } from '@/utils/action'
import { checkLink } from '@/utils/check-link'
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
import Link from 'next/link'
import { useEffect, useState } from 'react'
import useDrivePicker from 'react-google-drive-picker'
import toast from 'react-hot-toast'
import { BiSolidChevronRight } from 'react-icons/bi'
import { BsCheck, BsChevronDown } from 'react-icons/bs'
import { CgSpinner } from 'react-icons/cg'
import { PiMagnifyingGlass } from 'react-icons/pi'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import { useDebounce } from 'react-use'
import { Dropdown, Input } from 'rizzui'
import FileCard from './file-card'
import ListDriveButton from './list-drive-button'
import TambahBerkasModal from './modal/tambah-berkas'
import TambahFolderModal from './modal/tambah-folder'
import UbahBerkasModal from './modal/ubah-berkas'
import UbahFolderModal from './modal/ubah-folder'
import UbahLinkModal from './modal/ubah-link'

type GoogleFileType = {
  name: string
  url: string
}

const sortData = {
  terbaru: 'Terbaru',
  terlawas: 'Terlawas',
  asc: 'Nama A-Z',
  desc: 'Nama Z-A',
}

type SortDataType = keyof typeof sortData

const queryKeyDrive = ['pengguna.pustaka-media.drives']

export default function PustakaMediaBody() {
  const { jwt, processApi } = useSessionJwt()
  const [openPicker] = useDrivePicker()
  const queryClient = useQueryClient()

  const [activeDrive, setActiveDrive] = useState<string>()
  const [activeFolder, setActiveFolder] = useState<string>()
  const [sort, setSort] = useState<SortDataType>('terbaru')
  const [search, setSearch] = useState('')
  const [listFolder, setListFolder] = useState<PustakaMediaFolderType[]>([])
  const [fileHapus, setFileHapus] = useState<PustakaMediaFileType>()
  const [showTambahFolder, setShowTambahFolder] = useState(false)
  const [showTambahBerkas, setShowTambahBerkas] = useState(false)
  const [accessTokenPicker, setAccessTokenPicker] = useState<string>()
  const [newGoogleUpload, setNewGoogleUpload] = useState<GoogleFileType[]>([])
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
  const {
    show: showUnlinkDrive,
    key: emailUnlinkDrive,
    doShow: doShowUnlinkDrive,
    doHide: doHideUnlinkDrive,
  } = useShowModal<string>()
  const [filePreview, setFilePreview] = useState<FilePreviewType>()

  const { data: drives = [], isLoading: isLoadingDrive } = useQuery<
    PustakaMediaDriveType[]
  >({
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
    'pengguna.pustaka-media.files',
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
      const { data } = await listFileApi({
        jwt,
        personal: activeDrive === 'PERSONAL',
        googleDrive: activeDrive === 'GOOGLE_DRIVE',
        idInstansi,
        idFolder: activeFolder,
        page,
        search,
        sort: {
          name: ['terbaru', 'terlawas'].includes(sort) ? 'created_at' : 'nama',
          order: ['desc', 'terbaru'].includes(sort) ? 'desc' : 'asc',
        },
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
              driveId: item.google_drive
                ? 'GOOGLE_DRIVE'
                : item.id_instansi ?? 'PERSONAL',
              googleDrive: item.google_drive,
              external: item.penyimpanan === 'External',
            } as PustakaMediaFileType)
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

  useEffect(() => {
    refetchFiles()
  }, [sort, refetchFiles])

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

  const handleUbah = (file: PustakaMediaFileType) => {
    if (file.folder) {
      doShowUbahFolder(file.id)
    } else if (file.external) {
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

  const handleUnlinkDrive = async () => {
    await handleActionWithToast(processApi(unlinkGoogleDriveApi), {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: queryKeyDrive })

        if (activeDrive === 'GOOGLE_DRIVE') {
          setActiveDrive(undefined)
          setActiveFolder(undefined)
          setListFolder([])
        }
      },
      onFinish: () => doHideUnlinkDrive(),
    })
  }

  return (
    <>
      <ListDriveButton
        drives={drives}
        activeDrive={activeDrive}
        isLoading={isLoadingDrive}
        className="mb-6"
        onClick={(id) => {
          setActiveDrive(id)
          setActiveFolder(undefined)
          setListFolder([])
        }}
        onUnlinkDrive={(email) => doShowUnlinkDrive(email)}
      />
      <div className="flex flex-wrap items-center gap-y-1 mb-3">
        <Title as="h4" size="1.5xl" weight="semibold" className="leading-tight">
          {activeDrive === undefined
            ? 'Pustaka Media'
            : activeDrive === 'GOOGLE_DRIVE'
            ? 'Google Drive'
            : currentDrive.name}
        </Title>
        {listFolder.length > 0 &&
          listFolder.map((folder, idx) => (
            <div key={folder.id} className="flex items-center">
              <BiSolidChevronRight size={18} className="mx-2" />
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
                    setListFolder((list) => [...list.slice(0, idx + 1)])
                  }}
                >
                  {folder.name}
                </Button>
              )}
            </div>
          ))}
      </div>
      <div className="flex justify-between gap-2 flex-wrap">
        <div className="flex gap-2 flex-wrap">
          <Input
            size="sm"
            type="search"
            placeholder="Cari Berkas"
            className="w-72 sm:w-96"
            inputClassName="bg-white"
            prefix={
              <PiMagnifyingGlass size={20} className="text-gray-lighter" />
            }
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            clearable
            onClear={() => setSearch('')}
          />
          <Dropdown>
            <Dropdown.Trigger>
              <Button
                as="span"
                size="sm"
                variant="outline"
                className="bg-white"
              >
                {sortData[sort]} <BsChevronDown className="ml-2 w-5" />
              </Button>
            </Dropdown.Trigger>
            <Dropdown.Menu>
              {Object.keys(sortData).map((key) => (
                <Dropdown.Item
                  key={key}
                  className="justify-between"
                  onClick={() => setSort(key as SortDataType)}
                >
                  <Text size="sm">{sortData[key as SortDataType]}</Text>{' '}
                  {sort === key && <BsCheck size={18} />}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        {activeDrive !== undefined && (
          <div className="flex gap-x-2">
            {activeDrive === 'GOOGLE_DRIVE' && GOOGLE_PICKER ? (
              !!accessTokenPicker && (
                <Button
                  size="sm"
                  variant="outline-colorful"
                  className="bg-white"
                  onClick={handleOpenPicker}
                >
                  Tambah dari Google Drive
                </Button>
              )
            ) : (
              <Button
                size="sm"
                variant="outline-colorful"
                className="bg-white"
                onClick={() => setShowTambahBerkas(true)}
              >
                {activeDrive === 'GOOGLE_DRIVE' ? '' : 'Tambah Link/'}Unggah
                Media
              </Button>
            )}
            <Button
              size="sm"
              variant="outline-colorful"
              className="bg-white"
              onClick={() => setShowTambahFolder(true)}
            >
              Tambah Folder
            </Button>
          </div>
        )}
      </div>

      {isLoadingFiles ? (
        <ListFileShimmer />
      ) : (
        <div className="relative mt-4">
          {isFetchingFiles && (
            <div className="flex justify-center items-center absolute m-auto left-0 right-0 top-0 bottom-0 bg-white/50 rounded-lg z-10">
              <div className="size-10 rounded-full bg-transparent">
                <CgSpinner className="size-10 animate-spin text-primary" />
              </div>
            </div>
          )}
          {files.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {files.map((file) => (
                <FileCard
                  key={file.id}
                  file={file}
                  onEdit={handleUbah}
                  onDelete={(file) => setFileHapus(file)}
                  onFileClick={(file) => {
                    if (!file.link) return

                    setFilePreview({
                      url: file.link,
                      extension: file.extension,
                      image: file.type === 'image',
                    })
                  }}
                  onFolderClick={(file) => {
                    setActiveFolder(file.id)
                    setListFolder((list) => [
                      ...list,
                      {
                        name: file.name,
                        id: file.id,
                      },
                    ])

                    const drive = drives.filter(
                      (d) => d.id === (file.driveId ?? null)
                    )[0]
                    setActiveDrive(drive.id)
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-72">
              <Text size="sm" weight="medium">
                {search ? 'Berkas tidak ditemukan' : 'Belum ada berkas'}
              </Text>
            </div>
          )}

          {hasNextPageFiles && <Loader ref={refSentry} className="py-4" />}
        </div>
      )}

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
        refetchKeys={[queryKey, ['pengguna.pustaka-media.drives']]}
        googleDrive={activeDrive === 'GOOGLE_DRIVE'}
        idInstansi={idInstansi}
        idFolder={activeFolder}
        uploadLink={activeDrive !== 'GOOGLE_DRIVE'}
      />

      <UbahFolderModal
        show={showUbahFolder}
        id={keyUbahFolder}
        onHide={doHideUbahFolder}
        refetchKeys={[queryKey, ['pengguna.pustaka-media.drives']]}
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
        file={filePreview}
        onClose={() => setFilePreview(undefined)}
      />

      <ModalConfirm
        title="Hapus Berkas"
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

      <ModalConfirm
        title="Lepaskan Tautan Google Drive"
        desc={`Apakah Anda yakin ingin melepaskan tautan dengan google drive ${emailUnlinkDrive}?`}
        color="danger"
        isOpen={showUnlinkDrive}
        onClose={() => doHideUnlinkDrive()}
        cancel="Batal"
        confirm="Lepaskan"
        onConfirm={handleUnlinkDrive}
        headerIcon="warning"
        closeOnCancel
        confirmLoading
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

function ListFileShimmer() {
  return (
    <div className="grid grid-cols-1 gap-5 mt-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {[...Array(5)].map((_, idx) => (
        <Card key={idx} shadow="sm" rounded="lg" className="flex flex-col">
          <Shimmer className="size-11 mb-4" />
          <Shimmer className="h-3 w-5/12 my-1.5" />
          <Shimmer className="h-2 w-8/12 my-1.5" />
        </Card>
      ))}
    </div>
  )
}
