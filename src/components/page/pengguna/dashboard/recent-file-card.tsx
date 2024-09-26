import { listRecentFilesAction } from '@/actions/pengguna/dashboard/table-recent-files'
import { driveInfoAction } from '@/actions/shared/pustaka-media/drive-info'
import {
  Button,
  Card,
  CardSeparator,
  FilePreviewType,
  Loader,
  ModalFilePreview,
  PustakaMediaDriveType,
  PustakaMediaFileType,
  Text,
  Title,
} from '@/components/ui'
import TablePagination from '@/components/ui/controlled-async-table/pagination'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { BsCheck, BsChevronDown } from 'react-icons/bs'
import { Dropdown } from 'rizzui'
import RecentFileItem from './recent-file-item'

const perPage = 5
const queryKeyDrive = ['shared.pustaka-media.drives']

export default function DashboardRecentFileCard() {
  const [activeDrive, setActiveDrive] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [totalData, setTotalData] = useState(0)
  const [previewFile, setPreviewFile] = useState<FilePreviewType>()

  const { data: drives = [] } = useQuery<PustakaMediaDriveType[]>({
    queryKey: queryKeyDrive,
    queryFn: async () => {
      const { data } = await driveInfoAction()

      const personal = data?.media_personal_info
      const instansi = data?.daftar_media_instansi_info ?? []

      return [
        {
          id: null,
          name: 'Personal',
          size: personal?.kuota_total_in_kb ?? 0,
          used: personal?.kuota_terpakai_in_kb ?? 0,
        },
        ...instansi.map((item) => ({
          id: item.id_instansi,
          name: `${item.nama_instansi}`,
          size: item.kuota_total_in_kb,
          used: item.kuota_terpakai_in_kb,
        })),
      ]
    },
  })

  const queryKey = [
    'pengguna.dashboard.recent-files.files',
    activeDrive === undefined ? 'personal' : activeDrive,
  ]

  const {
    data: files = [],
    isLoading: isLoadingFiles,
    isFetching: isFetchingFiles,
    refetch: refetchFiles,
  } = useQuery<PustakaMediaFileType[]>({
    queryKey,
    queryFn: async () => {
      const { data } = await listRecentFilesAction({
        page,
        perPage,
        personal: activeDrive === null,
        idInstansi: activeDrive ?? undefined,
      })

      setTotalData(data?.pagination?.totalData ?? 0)

      return (
        data?.list?.map((item) => ({
          id: item.id,
          name: item.nama,
          time: item.created_at,
          link: item.url,
          extension: item.ekstensi,
          folder: false,
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

  useEffect(() => {
    refetchFiles()
  }, [refetchFiles, page])

  return (
    <>
      <Card className="flex flex-col flex-1 p-0">
        <div className="flex justify-between items-center p-2">
          <Title as="h4" weight="semibold">
            Berkas Terbaru
          </Title>
          <Dropdown>
            <Dropdown.Trigger>
              <Button as="span" size="sm" variant="outline">
                {drives.filter((item) => item.id === activeDrive)[0]?.name}{' '}
                <BsChevronDown className="ml-2 w-5" />
              </Button>
            </Dropdown.Trigger>
            <Dropdown.Menu>
              {drives.map((drive) => (
                <Dropdown.Item
                  key={drive.id ?? 'personal'}
                  className="justify-between"
                  onClick={() => setActiveDrive(drive.id ?? null)}
                >
                  <Text size="sm">{drive.name}</Text>{' '}
                  {drive.id === activeDrive ? <BsCheck size={18} /> : null}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <CardSeparator />
        {isLoadingFiles ? (
          <Loader height={344} />
        ) : totalData > 0 ? (
          <div className="min-h-[344px]">
            {files.map((file) => (
              <RecentFileItem
                key={file.id}
                file={file}
                onPreview={() => {
                  if (!file.link) return

                  setPreviewFile({
                    url: file.link,
                    extension: file.extension,
                  })
                }}
              />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center min-h-[344px]">
            <Text size="sm" weight="medium">
              {'Belum ada berkas'}
            </Text>
          </div>
        )}
        <TablePagination
          isLoading={isFetchingFiles}
          current={page}
          pageSize={perPage}
          total={totalData}
          onChange={(page) => setPage(page)}
        />
      </Card>

      <ModalFilePreview
        file={previewFile}
        onClose={() => setPreviewFile(undefined)}
      />
    </>
  )
}
