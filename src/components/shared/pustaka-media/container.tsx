import { Button, CardSeparator, Input, Modal, Text } from '@/components/ui'
import { useEffect, useState } from 'react'
import { BiChevronRight } from 'react-icons/bi'
import { PiMagnifyingGlass } from 'react-icons/pi'
import DriveButton from './drive-button'
import FileButton, { FileItemType } from './file-button'
import FolderButton, { FolderItemType } from './folder-button'

export type PustakaMediaProps = {
  onChange?(val: FileItemType[]): void
}

export default function PustakaMedia({ onChange }: PustakaMediaProps) {
  const [show, setShow] = useState(false)
  const [size, setSize] = useState<'xl' | 'full'>('xl')
  const [activeDrive, setActiveDrive] = useState<number | null>(null)
  const [activeFolder, setActiveFolder] = useState<FolderItemType | null>(null)

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
    setActiveDrive(null)
    setActiveFolder(null)
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
      name: 'Alur Sistem Informasi',
      size: 5120,
      time: '13 Januari 2024',
      icon: 'doc',
      link: 'https://www.example.com',
    },
    {
      id: 'a2',
      name: 'Penjelasan singkat Alur Sistem Informasi',
      size: null,
      time: '13 Januari 2024',
      icon: 'video',
      link: 'https://www.example.com',
    },
    {
      id: 'a3',
      name: 'Alur Sistem Informasi 2',
      size: 5120,
      time: '13 Januari 2024',
      icon: 'doc',
      link: 'https://www.example.com',
    },
    {
      id: 'a4',
      name: 'Alur Sistem Informasi 3',
      size: 5120,
      time: '13 Januari 2024',
      icon: 'doc',
      link: 'https://www.example.com',
    },
  ]

  return (
    <>
      <Button onClick={doShow}>Pustaka Media</Button>
      <Modal title="Pustaka Media" size={size} isOpen={show} onClose={doHide}>
        <div className="flex flex-col">
          <div className="flex flex-col min-h-[400px] lg:flex-row">
            <div className="flex flex-col lg:w-4/12 lg:border-r lg:border-r-gray-100">
              {drives.map((drive, idx) => (
                <DriveButton
                  drive={drive}
                  active={activeDrive === idx}
                  onClick={() => {
                    setActiveDrive(idx)
                    setActiveFolder(null)
                  }}
                  key={idx}
                />
              ))}
            </div>
            <div className="flex flex-col flex-1">
              {activeDrive != null && (
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
                            onChange={(val) => console.log(val)}
                            key={idx}
                          />
                        ))
                      : folders.map((folder, idx) => (
                          <FolderButton
                            folder={folder}
                            onClick={() => setActiveFolder(folder)}
                            key={idx}
                          />
                        ))}
                  </div>
                </>
              )}
            </div>
          </div>
          <CardSeparator />
          <div className="flex justify-end space-x-2 p-3">
            <Button
              size="sm"
              className="w-36"
              onClick={() => {
                onChange && onChange([files[0]])
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
      </Modal>
    </>
  )
}
