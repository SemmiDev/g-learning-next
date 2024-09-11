'use client'

import { driveInfoAction } from '@/actions/pengguna/pustaka-media/drive-info'
import { hapusBerkasAction } from '@/actions/pengguna/pustaka-media/hapus'
import { listFileAction } from '@/actions/pengguna/pustaka-media/list-file'
import { Button, Loader, ModalConfirm, Text, Title } from '@/components/ui'
import { handleActionWithToast } from '@/utils/action'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import _ from 'lodash'
import { useEffect, useState } from 'react'
import { BsCheck, BsChevronDown } from 'react-icons/bs'
import { PiMagnifyingGlass } from 'react-icons/pi'
import { Dropdown, Input } from 'rizzui'
import DriveButton from './drive-button'
import FileCard, { FileType } from './file-card'
import TambahModal from './modal/tambah'

const sortData = {
  terbaru: 'Terbaru',
  terlawas: 'Terlawas',
  asc: 'Nama A-Z',
  desc: 'Nama Z-A',
}

type SortDataType = keyof typeof sortData

type DriveType = {
  id: string | null
  name: string
  used: number
  size: number
}

export default function PustakaMediaBody() {
  const queryClient = useQueryClient()
  const [activeDrive, setActiveDrive] = useState<string | null>()
  const [activeFolder, setActiveFolder] = useState<string>()
  const [sort, setSort] = useState<SortDataType>('terbaru')
  const [search, setSearch] = useState('')
  const [fileHapus, setFileHapus] = useState<FileType>()
  const [showModalTambahFolder, setShowModalTambahFolder] = useState(false)

  const { data: drives = [] } = useQuery<DriveType[]>({
    queryKey: ['pengguna.pustaka-media.drives'],
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
          type: item.tipe === 'Folder' ? 'folder' : 'file',
          fileCount: item.tipe !== 'Folder' ? item.total_files : undefined,
          size: item.tipe !== 'Folder' ? item.ukuran : undefined,
          icon: item.tipe === 'Video' ? 'video' : 'file',
          driveId: item.id_instansi ?? undefined,
        })) ?? []
      )
    },
  })

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
      success: `Berhasil menghapus ${
        fileHapus.type === 'folder' ? 'folder' : 'berkas'
      }`,
      onSuccess: () => {
        setFileHapus(undefined)

        queryClient.invalidateQueries({ queryKey })
      },
    })
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
            }}
            key={drive.id ?? 'personal'}
          />
        ))}
      </div>
      <Title
        as="h4"
        size="1.5xl"
        weight="semibold"
        className="leading-tight mb-3"
      >
        Pustaka Media
      </Title>
      <div className="flex justify-between">
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
          <Button
            size="sm"
            variant="outline-colorful"
            onClick={() => setShowModalTambahFolder(true)}
          >
            Tambah Folder
          </Button>
        )}
      </div>

      {isLoadingFiles ? (
        <Loader height={300} />
      ) : files.length ? (
        <div className="grid grid-cols-1 gap-5 mt-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {files.map((file) => (
            <FileCard
              key={file.id}
              file={file}
              onDelete={(file) => setFileHapus(file)}
              onFolderClick={(file) => {
                setActiveFolder(file.id)

                const drive = drives.filter(
                  (d) => d.id === (file.driveId ?? null)
                )[0]
                setActiveDrive(drive.id)
              }}
            />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-52">
          <Text size="sm" weight="medium">
            Belum ada berkas
          </Text>
        </div>
      )}

      {/* <div className="flex justify-center mt-4">
        <Button>Tampilkan Lebih banyak</Button>
      </div> */}

      <TambahModal
        show={showModalTambahFolder}
        setShow={setShowModalTambahFolder}
        refetchKey={queryKey}
        idInstansi={activeDrive ?? undefined}
        idFolder={activeFolder}
      />

      <ModalConfirm
        title={`Hapus Berkas`}
        desc={`Apakah Anda yakin ingin menghapus ${
          fileHapus?.type === 'folder' ? 'folder' : 'berkas'
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
