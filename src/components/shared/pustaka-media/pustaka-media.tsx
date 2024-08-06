'use client'

import { Button, CardSeparator, Input, Modal, Text } from '@/components/ui'
import cn from '@/utils/class-names'
import { removeFromList } from '@/utils/list'
import { useEffect, useState } from 'react'
import { BiChevronRight } from 'react-icons/bi'
import { PiMagnifyingGlass } from 'react-icons/pi'
import { FieldError } from 'rizzui'
import DriveButton from './drive-button'
import FileButton, { FileItemType } from './file-button'
import FolderButton, { FolderItemType } from './folder-button'
import SelectedFile from './selected-file'

export type PustakaMediaProps = {
  label?: string
  placeholder?: string
  value?: FileItemType | FileItemType[]
  onChange?(val: FileItemType | FileItemType[]): void
  multiple?: boolean
  error?: string
  errorClassName?: string
}

export default function PustakaMedia({
  label,
  placeholder = 'Klik di sini untuk memilih dari pustaka media',
  value,
  onChange,
  multiple = false,
  error,
  errorClassName,
}: PustakaMediaProps) {
  const [show, setShow] = useState(false)
  const [size, setSize] = useState<'xl' | 'full'>('xl')
  const [activeDrive, setActiveDrive] = useState<number>()
  const [activeFolder, setActiveFolder] = useState<FolderItemType>()
  const [checkedFileIds, setCheckedFileIds] = useState<string[]>([])
  const [selectedFiles, setSelectedFiles] = useState<FileItemType[]>(
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

  const doShow = () => {
    setShow(true)
  }

  const doHide = () => {
    setShow(false)
  }

  const doChange = (selected: FileItemType[]) => {
    setSelectedFiles(selected)

    onChange && onChange(multiple === true ? selected : selected[0])
  }

  const drives = [
    { name: 'Penyimpanan Personal', used: 307200, size: 1048576 },
    { name: 'Penyimpanan Akademik', used: 11534336, size: 20971520 },
  ]

  const folders: FolderItemType[] = [
    { name: 'Aljabar Linear', fileCount: 10 },
    { name: 'Matematika Diskrit', fileCount: 17 },
    { name: 'Sistem Informasi', fileCount: 5 },
  ]

  const files: FileItemType[] = [
    {
      id: 'a1',
      name: 'Alur Sistem Informasi.docx',
      size: 5120,
      time: '13 Januari 2024',
      type: 'file',
      link: 'https://www.example.com',
    },
    {
      id: 'a2',
      name: 'Penjelasan singkat Alur Sistem Informasi',
      size: null,
      time: '13 Januari 2024',
      type: 'link-video',
      link: 'https://www.example.com',
    },
    {
      id: 'a3',
      name: 'Alur Sistem Informasi 2.pdf',
      size: 5120,
      time: '13 Januari 2024',
      type: 'file',
      link: 'https://www.example.com',
    },
    {
      id: 'a4',
      name: 'Alur Sistem Informasi 3.pdf',
      size: 5120,
      time: '13 Januari 2024',
      type: 'file',
      link: 'https://www.example.com',
    },
  ]

  return (
    <>
      <div>
        <div
          onClick={() => {
            setCheckedFileIds(selectedFiles.map((file) => file.id))
            doShow()
          }}
        >
          {label && (
            <label className="text-gray-dark font-semibold mb-1.5 block">
              {label}
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
                  file={file}
                  onRemove={() => {
                    const selected = removeFromList(selectedFiles, file)
                    doChange(selected)
                  }}
                  key={file.id}
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

      <Modal title="Pustaka Media" size={size} isOpen={show} onClose={doHide}>
        <div className="flex flex-col justify-between min-h-[calc(100vh-57px)] xl:min-h-full">
          <div className="flex flex-col min-h-[400px] lg:flex-row">
            <div className="flex flex-col lg:w-4/12 lg:border-r lg:border-r-gray-100">
              {drives.map((drive, idx) => (
                <DriveButton
                  drive={drive}
                  active={activeDrive === idx}
                  onClick={() => {
                    setActiveDrive(idx)
                    setActiveFolder(undefined)
                  }}
                  key={idx}
                />
              ))}
            </div>
            <div className="flex flex-col flex-1">
              {activeDrive && activeDrive >= 0 && (
                <>
                  <div className="flex justify-between space-x-2 p-3">
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
                    />
                    <Button size="sm" onClick={() => {}}>
                      {activeFolder ? 'Upload Berkas' : 'Tambah Folder'}
                    </Button>
                  </div>
                  <div className="flex items-center border-b border-b-gray-100 px-3 pb-3">
                    <Text weight="medium" variant="dark">
                      {drives[activeDrive].name}
                    </Text>
                    {activeFolder && (
                      <>
                        <BiChevronRight size={24} />
                        <Text weight="medium" variant="dark">
                          {activeFolder.name}
                        </Text>
                      </>
                    )}
                  </div>
                  <div className="flex flex-col">
                    {activeFolder
                      ? files.map((file, idx) => (
                          <FileButton
                            file={file}
                            checked={checkedFileIds.indexOf(file.id) >= 0}
                            onChange={(val) => {
                              if (multiple) {
                                if (val) {
                                  setCheckedFileIds([
                                    ...checkedFileIds,
                                    file.id,
                                  ])
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
                            key={idx}
                          />
                        ))
                      : folders.map((folder, idx) => (
                          <FolderButton
                            folder={folder}
                            onOpen={() => setActiveFolder(folder)}
                            key={idx}
                          />
                        ))}
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
                  doHide()
                }}
              >
                Pilih Berkas
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="w-36"
                onClick={doHide}
              >
                Batal
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}
