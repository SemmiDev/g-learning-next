'use client'

import { driveInfoAction } from '@/actions/shared/pustaka-media/drive-info'
import { hapusBerkasAction } from '@/actions/shared/pustaka-media/hapus'
import { listFileAction } from '@/actions/shared/pustaka-media/list-file'
import {
  ActionIconTooltip,
  Button,
  CardSeparator,
  Input,
  Label,
  Modal,
  ModalConfirm,
  Text,
  TextSpan,
} from '@/components/ui'
import { handleActionWithToast } from '@/utils/action'
import cn from '@/utils/class-names'
import { removeFromList } from '@/utils/list'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import _ from 'lodash'
import { useEffect, useState } from 'react'
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

export type FileType = {
  id: string
  name: string
  folder: boolean
  extension?: string
  fileCount?: number
  size?: number
  time: string
  type?: 'link' | 'audio' | 'video' | 'image'
  link?: string
  driveId?: string
}

export type FolderType = {
  id: string
  name: string
}

const queryKeyDrive = ['shared.pustaka-media.drives']

export type PustakaMediaProps = {
  label?: string
  required?: boolean
  placeholder?: string
  value?: FileType | FileType[]
  onChange?(val: FileType | FileType[]): void
  multiple?: boolean
  error?: string
  errorClassName?: string
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
}: PustakaMediaProps) {
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
  const [checkedFileIds, setCheckedFileIds] = useState<string[]>([])
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

  return (
    <>
      <div>
        <div
          onClick={() => {
            setCheckedFileIds(selectedFiles.map((file) => file.id))
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
                    {files.map((file) =>
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
                          checked={checkedFileIds.indexOf(file.id) >= 0}
                          onChange={(val) => {
                            if (multiple) {
                              if (val) {
                                setCheckedFileIds([...checkedFileIds, file.id])
                              } else {
                                setCheckedFileIds(
                                  removeFromList(checkedFileIds, file.id)
                                )
                              }
                            } else {
                              setCheckedFileIds([file.id])
                            }
                          }}
                          multiple={multiple}
                        />
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
                  const selected = files.filter(
                    (val) => checkedFileIds.indexOf(val.id) >= 0
                  )
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
