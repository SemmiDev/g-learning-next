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
import { routes } from '@/config/routes'
import { formatBytes } from '@/utils/bytes'
import cn from '@/utils/class-names'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { BsDownload, BsThreeDotsVertical } from 'react-icons/bs'
import { GoDotFill } from 'react-icons/go'
import { GrShare } from 'react-icons/gr'
import { Dropdown } from 'rizzui'

export type BerkasType = PustakaMediaFileType & {
  idAktifitas: string
  aktifitas: string
  tipeAktifitas: string
}

type BerkasCardProps = {
  file: BerkasType
  onPreview?: (file: BerkasType) => void
  className?: string
}

export default function BerkasCard({
  file,
  onPreview,
  className,
}: BerkasCardProps) {
  const { kelas: idKelas }: { kelas: string } = useParams()

  const isPreviewable = isPreviewableFile(file.link ?? '', file.extension)
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

  const pointer =
    file.type === 'link' ||
    (!!file.link && isPreviewableFile(file.link, file.extension))

  return (
    <div
      className={cn(
        'relative rounded-lg border border-muted p-2 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md',
        className
      )}
    >
      <div className="flex">
        <LinkOrDiv
          className={cn('flex-1 h-[60px]', { 'cursor-pointer': pointer })}
          {...linkingProps}
        >
          <FileIcon file={file} />
        </LinkOrDiv>
        <div className="flex flex-col">
          <Dropdown placement="bottom-end">
            <Dropdown.Trigger>
              <ActionIcon as="span" size="sm" variant="outline-hover">
                <BsThreeDotsVertical size={14} />
              </ActionIcon>
            </Dropdown.Trigger>
            <Dropdown.Menu className="w-30 divide-y !py-0">
              <div className="py-2">
                <Link
                  href={`${routes.pengguna.ruangKelas}/${idKelas}/diskusi/${file.tipeAktifitas}/${file.idAktifitas}`}
                >
                  <Dropdown.Item className="text-gray-dark">
                    <GrShare className="text-success-dark size-4 mr-2" />
                    Buka Diskusi Terkait
                  </Dropdown.Item>
                </Link>
                {!file.folder && file.type !== 'link' && file.link && (
                  <Link href={file.link} target="_blank">
                    <Dropdown.Item as="li" className="text-gray-dark">
                      <BsDownload className="text-primary size-4 mr-2" />
                      Unduh
                    </Dropdown.Item>
                  </Link>
                )}
              </div>
            </Dropdown.Menu>
          </Dropdown>
          <LinkOrDiv
            className={cn('flex-1', { 'cursor-pointer': pointer })}
            {...linkingProps}
          />
        </div>
      </div>
      <LinkOrDiv
        className={cn({ 'cursor-pointer': pointer })}
        {...linkingProps}
      >
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
    </div>
  )
}
