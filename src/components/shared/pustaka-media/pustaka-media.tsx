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
import { handleActionWithToast } from '@/utils/action'
import cn from '@/utils/class-names'
import {
  getFileCount,
  getFileIsFolder,
  getFileSize,
  getFileType,
} from '@/utils/file-properties-from-api'
import { removeFromList } from '@/utils/list'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import _ from 'lodash'
import { useSession } from 'next-auth/react'
import { ReactNode, useEffect, useState } from 'react'
import { BiChevronRight } from 'react-icons/bi'
import {
  PiFolderPlusFill,
  PiMagnifyingGlass,
  PiUploadSimpleBold,
} from 'react-icons/pi'
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
  id: string | null
  name: string
  used: number
  size: number
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
}: PustakaMediaProps) {
  const { status } = useSession()
  const queryClient = useQueryClient()
  const [show, setShow] = useState(false)
  const [size, setSize] = useState<'xl' | 'full'>('xl')
  const [activeDrive, setActiveDrive] = useState<string | null>()
  const [activeFolder, setActiveFolder] = useState<string>()
  const [search, setSearch] = useState('')
  const [listFolder, setListFolder] = useState<FolderType[]>([])
  const [fileHapus, setFileHapus] = useState<FileType>()
  const [showModalTambahFolder, setShowModalTambahFolder] = useState(false)
  const [showModalTambahBerkas, setShowModalTambahBerkas] = useState(false)
  const [idUbahFolder, setIdUbahFolder] = useState<string>()
  const [idUbahLink, setIdUbahLink] = useState<string>()
  const [idUbahFile, setIdUbahFile] = useState<string>()
  const [previewFile, setPreviewFile] = useState<FilePreviewType>()
  const [checkedFiles, setCheckedFiles] = useState<FileType[]>([])
  const [selectedFiles, setSelectedFiles] = useState<FileType[]>(
    Array.isArray(value) ? value : value ? [value] : []
  )

  const handleResize = () => {
    if (window.innerWidth < 1280) {
      setSize('full')
    } else {
      setSize('xl')
    }
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    handleResize()
  }, [])

  const doChange = (selected: FileType[]) => {
    setSelectedFiles(selected)

    onChange && onChange(multiple === true ? selected : selected[0])
  }

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
    'shared.pustaka-media.files',
    activeDrive === undefined
      ? 'none'
      : activeDrive === null
      ? 'personal'
      : activeDrive,
    activeFolder ?? 'all',
  ]

  const {
    data: files = [],
    isLoading: isLoadingFiles,
    refetch: refetchFiles,
  } = useQuery<FileType[]>({
    queryKey,
    queryFn: async () => {
      if (activeDrive === undefined) {
        return []
      }

      const { data } = await listFileAction({
        personal: activeDrive === null,
        idInstansi: activeDrive ?? undefined,
        idFolder: activeFolder,
        search,
        sort: {
          name: 'nama',
          direction: 'asc',
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

      return (
        data?.list?.map((item) => ({
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
        })) ?? []
      )
    },
  })

  const currentDrive = drives.filter((item) => item.id === activeDrive)[0]

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
    if (file.type === 'link') {
      setIdUbahLink(file.id)
    } else {
      setIdUbahFile(file.id)
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
            {selectedFiles.length > 0 &&
              selectedFiles.map((file) => (
                <SelectedFile
                  key={file.id}
                  file={file}
                  onRemove={() => {
                    const selected = removeFromList(selectedFiles, file)
                    doChange(selected)
                  }}
                />
              ))}
            <Text size="sm" className="pustaka-media-label text-gray-lighter">
              {placeholder}
            </Text>
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
                  <div className="flex justify-between items-center space-x-2 p-3">
                    <Input
                      size="sm"
                      type="search"
                      placeholder="Cari Berkas"
                      clearable={true}
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
                    <div className="flex space-x-1">
                      <ActionIconTooltip
                        tooltip="Tambah Link/Unggah Media"
                        size="sm"
                        onClick={() => setShowModalTambahBerkas(true)}
                      >
                        <PiUploadSimpleBold />
                      </ActionIconTooltip>
                      <ActionIconTooltip
                        tooltip="Tambah Folder"
                        size="sm"
                        onClick={() => setShowModalTambahFolder(true)}
                      >
                        <PiFolderPlusFill />
                      </ActionIconTooltip>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center border-b border-b-gray-100 px-3 pb-3">
                    <Text weight="medium" variant="dark">
                      {currentDrive.name}
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
                  <div className="flex flex-col">
                    {isLoadingFiles ? (
                      <Loader height={200} />
                    ) : (
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
                            onEdit={(file) => setIdUbahFolder(file.id)}
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
                                    removeFromList(checkedFiles, file)
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
                    )}
                  </div>
                </>
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
                  const selected = [...checkedFiles]
                  doChange(selected)
                  setShow(false)
                }}
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
        show={showModalTambahFolder}
        setShow={setShowModalTambahFolder}
        refetchKey={queryKey}
        idInstansi={activeDrive ?? undefined}
        idFolder={activeFolder}
      />

      <TambahBerkasModal
        show={showModalTambahBerkas}
        setShow={setShowModalTambahBerkas}
        refetchKeys={[queryKey, ['shared.pustaka-media.drives']]}
        idInstansi={activeDrive ?? undefined}
        idFolder={activeFolder}
        uploadLink={!types || (!!types && types?.includes('link'))}
      />

      <UbahFolderModal
        id={idUbahFolder}
        setId={setIdUbahFolder}
        refetchKeys={[queryKey, ['shared.pustaka-media.drives']]}
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
