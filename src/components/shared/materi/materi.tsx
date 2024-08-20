'use client'

import {
  Button,
  CardSeparator,
  Input,
  Label,
  Modal,
  Text,
} from '@/components/ui'
import cn from '@/utils/class-names'
import { useEffect, useState } from 'react'
import { BiChevronRight } from 'react-icons/bi'
import { PiMagnifyingGlass } from 'react-icons/pi'
import { FieldError } from 'rizzui'
import FolderButton, { FolderItemType } from './folder-button'
import MateriButton, { MateriItemType } from './materi-button'
import SelectedMateri from './selected-materi'

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
  const [show, setShow] = useState(false)
  const [size, setSize] = useState<'lg' | 'xl' | 'full'>('lg')
  const [activeFolder, setActiveFolder] = useState<FolderItemType>()
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

  const doShow = () => {
    setShow(true)
  }

  const doHide = () => {
    setShow(false)
  }

  const doChange = (selected: MateriItemType | undefined) => {
    setSelectedMateri(selected)

    onChange && onChange(selected)
  }

  const folders: FolderItemType[] = [
    { name: 'Aljabar Linear', count: 10 },
    { name: 'Matematika Diskrit', count: 17 },
    { name: 'Sistem Informasi', count: 5 },
  ]

  const dataMateri: MateriItemType[] = [
    {
      id: 'a1',
      name: 'Alur Sistem Informasi',
      time: '13 Januari 2024',
      fileCount: 4,
      type: 'materi',
    },
    {
      id: 'a2',
      name: 'Penjelasan singkat Alur Sistem Informasi',
      time: '13 Januari 2024',
      fileCount: 2,
      type: 'materi',
    },
    {
      id: 'a3',
      name: 'Alur Sistem Informasi 2',
      time: '13 Januari 2024',
      fileCount: 1,
      type: 'materi',
    },
    {
      id: 'a4',
      name: 'Tugas Alur Sistem Informasi',
      time: '13 Januari 2024',
      fileCount: 3,
      type: 'tugas',
    },
    {
      id: 'a5',
      name: 'Tugas 2 Alur Sistem Informasi',
      time: '13 Januari 2024',
      fileCount: 1,
      type: 'tugas',
    },
  ]

  return (
    <>
      <div>
        <div
          onClick={() => {
            setCheckedMateriId(selectedMateri?.id)
            doShow()
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
        onClose={doHide}
      >
        <div className="flex flex-col justify-between min-h-[calc(100vh-57px)] lg:min-h-full">
          <div className="flex flex-col min-h-[400px]">
            <div className="flex justify-between space-x-2 p-3">
              <Input
                size="sm"
                type="search"
                placeholder="Cari Materi"
                clearable={true}
                className="w-72 sm:w-96"
                prefix={
                  <PiMagnifyingGlass size={20} className="text-gray-lighter" />
                }
              />
              <Button size="sm" onClick={() => {}}>
                {activeFolder ? 'Tambah Materi' : 'Tambah Folder'}
              </Button>
            </div>
            <div className="flex items-center border-b border-b-gray-100 px-3 pb-3">
              <Text
                weight="medium"
                variant="dark"
                className={cn({ 'cursor-pointer': activeFolder })}
                onClick={() => activeFolder && setActiveFolder(undefined)}
              >
                Bank Materi dan Tugas
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
                ? dataMateri.map((materi, idx) => (
                    <MateriButton
                      materi={materi}
                      checked={checkedMateriId === materi.id}
                      onChange={() => {
                        setCheckedMateriId(materi.id)
                      }}
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
          </div>
          <div>
            <CardSeparator />
            <div className="flex justify-end space-x-2 p-3">
              <Button
                size="sm"
                className="w-36"
                onClick={() => {
                  const selected = dataMateri.find(
                    (val) => val.id === checkedMateriId
                  )
                  doChange(selected)
                  doHide()
                }}
              >
                Pilih Materi
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
