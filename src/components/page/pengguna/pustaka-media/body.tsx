'use client'

import { driveInfoAction } from '@/actions/shared/pustaka-media/drive-info'
import { hapusBerkasAction } from '@/actions/shared/pustaka-media/hapus'
import { listFileAction } from '@/actions/shared/pustaka-media/list-file'
import {
  DriveType,
  FileType,
  FolderType,
} from '@/components/shared/pustaka-media/pustaka-media'
import {
  Button,
  FilePreviewType,
  isPreviewableFile,
  Loader,
  ModalConfirm,
  ModalFilePreview,
  Text,
  TextSpan,
  Title,
} from '@/components/ui'
import { handleActionWithToast } from '@/utils/action'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import _ from 'lodash'
import { useEffect, useState } from 'react'
import { BiSolidChevronRight } from 'react-icons/bi'
import { BsCheck, BsChevronDown } from 'react-icons/bs'
import { PiMagnifyingGlass } from 'react-icons/pi'
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
  const [listFolder, setListFolder] = useState<FolderType[]>([])
  const [fileHapus, setFileHapus] = useState<FileType>()
  const [showModalTambahFolder, setShowModalTambahFolder] = useState(false)
  const [showModalTambahBerkas, setShowModalTambahBerkas] = useState(false)
  const [idUbahFolder, setIdUbahFolder] = useState<string>()
  const [idUbahLink, setIdUbahLink] = useState<string>()
  const [idUbahFile, setIdUbahFile] = useState<string>()
  const [filePreview, setFilePreview] = useState<FilePreviewType>()

  const { data: drives = [] } = useQuery<DriveType[]>({
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
    data: files = [],
    isLoading: isLoadingFiles,
    isFetching: isFetchingFiles,
    refetch: refetchFiles,
  } = useQuery<FileType[]>({
    queryKey,
    queryFn: async () => {
      const { data } = await listFileAction({
        personal: activeDrive === null,
        idInstansi: activeDrive ?? undefined,
        idFolder: activeFolder,
        search,
        sort: {
          name: ['terbaru', 'terlawas'].includes(sort) ? 'created_at' : 'nama',
          direction: ['desc', 'terbaru'].includes(sort) ? 'desc' : 'asc',
        },
      })

      return (
        data?.list?.map((item) => ({
          id: item.id,
          name: item.nama,
          time: item.created_at,
          link: item.url,
          extension: item.ekstensi,
          folder: item.tipe === 'Folder',
          fileCount: item.tipe === 'Folder' ? item.total_files : undefined,
          size: item.tipe !== 'Folder' ? item.ukuran : undefined,
          type:
            item.tipe === 'Audio'
              ? 'audio'
              : item.tipe === 'Video'
              ? 'video'
              : item.tipe === 'Gambar'
              ? 'image'
              : item.tipe === 'Teks'
              ? 'link'
              : undefined,
          driveId: item.id_instansi ?? undefined,
        })) ?? []
      )
    },
  })

  const currentDrive = drives.filter((item) => item.id === activeDrive)[0]

  useEffect(() => {
    refetchFiles()
  }, [sort, refetchFiles])

  useEffect(() => {
    if (search === '') {
      refetchFiles()
      return
    }

    _.debounce(refetchFiles, 250)()
  }, [search, refetchFiles])

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
    if (file.folder) {
      setIdUbahFolder(file.id)
    } else if (file.type === 'link') {
      setIdUbahLink(file.id)
    } else {
      setIdUbahFile(file.id)
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
        <div className="flex space-x-2">
          <Input
            size="sm"
            type="search"
            placeholder="Cari Berkas"
            clearable={true}
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
              onClick={() => setShowModalTambahBerkas(true)}
            >
              Tambah Link/Unggah Media
            </Button>
            <Button
              size="sm"
              variant="outline-colorful"
              onClick={() => setShowModalTambahFolder(true)}
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
                isPreviewableFile(file.name, file.extension)
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

      <TambahFolderModal
        show={showModalTambahFolder}
        setShow={setShowModalTambahFolder}
        refetchKey={queryKey}
        idInstansi={activeDrive ?? undefined}
        idFolder={activeFolder}
      />

      <TambahBerkasModal
        show={showModalTambahBerkas}
        setShow={setShowModalTambahBerkas}
        refetchKeys={[queryKey, ['pengguna.pustaka-media.drives']]}
        idInstansi={activeDrive ?? undefined}
        idFolder={activeFolder}
      />

      <UbahFolderModal
        id={idUbahFolder}
        setId={setIdUbahFolder}
        refetchKeys={[queryKey, ['pengguna.pustaka-media.drives']]}
      />

      <UbahLinkModal
        id={idUbahLink}
        setId={setIdUbahLink}
        refetchKey={queryKey}
      />

      <UbahBerkasModal
        id={idUbahFile}
        setId={setIdUbahFile}
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
