import { DataType as DataKelasType } from '@/services/actions/pengguna/ruang-kelas/lihat'
import {
  ActionIcon,
  FileIcon,
  isPreviewableFile,
  LinkOrDiv,
  PustakaMediaFileType,
  Text,
  Time,
  Title,
} from '@/components/ui'
import { isPreviewableType } from '@/components/ui/modal/file-preview/file'
import { routes } from '@/config/routes'
import { formatBytes } from '@/utils/bytes'
import cn from '@/utils/class-names'
import { downloadFileUrl } from '@/utils/file-url'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { BsDownload, BsThreeDotsVertical } from 'react-icons/bs'
import { GoDotFill } from 'react-icons/go'
import { GrShare } from 'react-icons/gr'
import { Dropdown } from 'rizzui'

export type BerkasType = PustakaMediaFileType & {
  idPertemuan: string | null
  idAktifitas: string
  aktifitas: string
  tipeAktifitas: string
}

type BerkasCardProps = {
  kelas: DataKelasType
  file: BerkasType
  onPreview?: (file: BerkasType) => void
  className?: string
}

export default function BerkasCard({
  kelas,
  file,
  onPreview,
  className,
}: BerkasCardProps) {
  const { kelas: idKelas }: { kelas: string } = useParams()

  const isPreviewable =
    isPreviewableFile(file.link ?? '', file.extension) ||
    isPreviewableType(file.type)
  const linkingProps = {
    href:
      !file.folder && file.type === 'link' && !isPreviewable
        ? file.link
        : undefined,
    target: '_blank',
    onClick: () => {
      if (file.type !== 'link' || isPreviewable) {
        onPreview && onPreview(file)
      }
    },
  }

  const pointer = file.type === 'link' || (!!file.link && isPreviewable)

  const jenisKelas = kelas?.peran === 'Pengajar' ? 'dikelola' : 'diikuti'
  const tipeKelas = kelas?.kelas.tipe === 'Akademik' ? 'akademik' : 'umum'

  const linkToKelas =
    kelas?.kelas.tipe === 'Akademik' && file.idPertemuan
      ? `${routes.pengguna.ruangKelas[jenisKelas][tipeKelas]}/${idKelas}/sesi-pembelajaran/${file.idPertemuan}/materi/${file.idAktifitas}`
      : `${routes.pengguna.ruangKelas[jenisKelas][tipeKelas]}/${idKelas}/diskusi/${file.tipeAktifitas}/${file.idAktifitas}`

  return (
    <div
      className={cn(
        'relative bg-white rounded-lg border border-muted p-2 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md hover:bg-muted/5',
        className
      )}
    >
      <LinkOrDiv
        className={cn({ 'cursor-pointer': pointer })}
        {...linkingProps}
      >
        <FileIcon file={file} className="mb-4" />
        <Title
          as="h4"
          size="base"
          weight="medium"
          variant="dark"
          className="truncate"
          title={file.name}
        >
          {file.name}
        </Title>
        <ul className="flex flex-wrap items-center gap-x-1 text-sm text-gray-lighter">
          <li>
            {file.size ? (
              formatBytes(file.size, 2)
            ) : (
              <Time date={file.time} format="date" />
            )}
          </li>
          {!!file.size && (
            <>
              <li>
                <GoDotFill size={10} />
              </li>
              <li>
                <Time date={file.time} format="datetime" />
              </li>
            </>
          )}
        </ul>
        <Text size="sm" title={file.aktifitas} className="truncate">
          {file.aktifitas}
        </Text>
      </LinkOrDiv>
      <Dropdown placement="bottom-end" className="absolute top-2 right-2">
        <Dropdown.Trigger>
          <ActionIcon as="span" size="sm" variant="outline-hover">
            <BsThreeDotsVertical size={14} />
          </ActionIcon>
        </Dropdown.Trigger>
        <Dropdown.Menu className="w-30 divide-y !py-0">
          <div className="py-2">
            <Link href={linkToKelas}>
              <Dropdown.Item className="text-gray-dark">
                <GrShare className="text-success-dark size-4 mr-2" />
                Buka Diskusi Terkait
              </Dropdown.Item>
            </Link>
            {!file.folder && file.type !== 'link' && file.link && (
              <Link href={downloadFileUrl(file.link) ?? ''} target="_blank">
                <Dropdown.Item as="li" className="text-gray-dark">
                  <BsDownload className="text-primary size-4 mr-2" />
                  Unduh
                </Dropdown.Item>
              </Link>
            )}
          </div>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  )
}
