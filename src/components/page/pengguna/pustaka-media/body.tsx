'use client'

import { driveInfoAction } from '@/actions/shared/pustaka-media/drive-info'
import { hapusBerkasAction } from '@/actions/shared/pustaka-media/hapus'
import { listFileAction } from '@/actions/shared/pustaka-media/list-file'
import {
  Button,
  FilePreviewType,
  isPreviewableFile,
  Loader,
  ModalConfirm,
  ModalFilePreview,
  PustakaMediaDriveType,
  PustakaMediaFileType,
  PustakaMediaFolderType,
  Text,
  TextSpan,
  Title,
} from '@/components/ui'
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
import { useEffect, useState } from 'react'
import { BiSolidChevronRight } from 'react-icons/bi'
import { BsCheck, BsChevronDown } from 'react-icons/bs'
import { PiMagnifyingGlass } from 'react-icons/pi'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import { useDebounce } from 'react-use'
import { Dropdown, Input } from 'rizzui'
import DriveButton from './drive-button'
import FileCard from './file-card'
import TambahBerkasModal from './modal/tambah-berkas'
import TambahFolderModal from './modal/tambah-folder'
import UbahBerkasModal from './modal/ubah-berkas'
import UbahFolderModal from './modal/ubah-folder'
import UbahLinkModal from './modal/ubah-link'

const sortData = {
  terbaru: 'Terbaru',
  terlawas: 'Terlawas',
  asc: 'Nama A-Z',
  desc: 'Nama Z-A',
}

type SortDataType = keyof typeof sortData

const queryKeyDrive = ['pengguna.pustaka-media.drives']

export default function PustakaMediaBody() {
  const queryClient = useQueryClient()
  const [activeDrive, setActiveDrive] = useState<string | null>()
  const [activeFolder, setActiveFolder] = useState<string>()
  const [sort, setSort] = useState<SortDataType>('terbaru')
  const [search, setSearch] = useState('')
  const [listFolder, setListFolder] = useState<PustakaMediaFolderType[]>([])
  const [fileHapus, setFileHapus] = useState<PustakaMediaFileType>()
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
  const [filePreview, setFilePreview] = useState<FilePreviewType>()

  const { data: drives = [] } = useQuery<PustakaMediaDriveType[]>({
    queryKey: queryKeyDrive,
    queryFn: async () => {
      const { data } = await driveInfoAction()

      const personal = data?.media_personal_info
      const instansi = data?.daftar_media_instansi_info ?? []

      return [
        {
          id: null,
          name: 'Penyimpanan Personal',
          size: personal?.kuota_total_in_kb ?? 0,
          used: personal?.kuota_terpakai_in_kb ?? 0,
        },
        ...instansi.map((item) => ({
          id: item.id_instansi,
          name: `Penyimpanan ${item.nama_instansi}`,
          size: item.kuota_total_in_kb,
          used: item.kuota_terpakai_in_kb,
        })),
      ]
    },
  })

  const queryKey = [
    'pengguna.pustaka-media.files',
    activeDrive === undefined
      ? 'all'
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
      const { data } = await listFileAction({
        personal: activeDrive === null,
        idInstansi: activeDrive ?? undefined,
        idFolder: activeFolder,
        page,
        search,
        sort: {
          name: ['terbaru', 'terlawas'].includes(sort) ? 'created_at' : 'nama',
          order: ['desc', 'terbaru'].includes(sort) ? 'desc' : 'asc',
        },
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
        })) as PustakaMediaFileType[],
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

  const handleUbah = (file: PustakaMediaFileType) => {
    if (file.folder) {
      doShowUbahFolder(file.id)
    } else if (file.type === 'link') {
      doShowUbahLink(file.id)
    } else {
      doShowUbahFile(file.id)
    }
  }

  return (
    <>
      <div className="flex flex-wrap gap-4 mb-6">
        {drives.map((drive) => (
          <DriveButton
            drive={drive}
            active={activeDrive === drive.id}
            onClick={() => {
              setActiveDrive(drive.id)
              setActiveFolder(undefined)
              setListFolder([])
            }}
            key={drive.id ?? 'personal'}
          />
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-y-1 mb-3">
        <Title as="h4" size="1.5xl" weight="semibold" className="leading-tight">
          {activeDrive === undefined
            ? 'Pustaka Media'
            : activeDrive === null
            ? 'Penyimpanan Personal'
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
            clearable
            className="w-72 sm:w-96"
            prefix={
              <PiMagnifyingGlass size={20} className="text-gray-lighter" />
            }
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onClear={() => setSearch('')}
          />
          <Dropdown>
            <Dropdown.Trigger>
              <Button as="span" size="sm" variant="outline">
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
          <div className="flex space-x-2">
            <Button
              size="sm"
              variant="outline-colorful"
              onClick={() => setShowTambahBerkas(true)}
            >
              Tambah Link/Unggah Media
            </Button>
            <Button
              size="sm"
              variant="outline-colorful"
              onClick={() => setShowTambahFolder(true)}
            >
              Tambah Folder
            </Button>
          </div>
        )}
      </div>

      {isLoadingFiles || (!files.length && isFetchingFiles) ? (
        <Loader height={300} />
      ) : files.length ? (
        <div className="grid grid-cols-1 gap-5 mt-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
              pointer={
                file.folder ||
                file.type === 'link' ||
                (!!file.link && isPreviewableFile(file.link, file.extension))
              }
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

      {!isLoadingFiles && hasNextPageFiles && (
        <Loader ref={refSentry} className="py-4" />
      )}

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
        refetchKeys={[queryKey, ['pengguna.pustaka-media.drives']]}
        idInstansi={activeDrive ?? undefined}
        idFolder={activeFolder}
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

      <UbahBerkasModal
        show={showUbahFile}
        id={keyUbahFile}
        onHide={doHideUbahFile}
        refetchKey={queryKey}
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
    </>
  )
}
