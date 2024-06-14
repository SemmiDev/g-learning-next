import { Button, Text } from '@/components/ui'
import { formatBytes } from '@/utils/bytes'
import FileIcon from './file-icon'
import cn from '@/utils/class-names'
import Link from 'next/link'

export type FileListItemType = {
  name: string
  size: number
  link?: string
}

type FileListItemProps = {
  file: FileListItemType
  download?: boolean
  className?: string
}

export default function FileListItem({
  file,
  download = false,
  className,
}: FileListItemProps) {
  return (
    <div
      className={cn(
        'flex justify-between items-center bg-gray-50 rounded-md p-1',
        className
      )}
    >
      <div className="flex items-center">
        <figure className="flex justify-center items-center size-11">
          <FileIcon filename={file.name} />
        </figure>
        <div className="flex flex-col">
          <Text size="sm" weight="semibold" color="primary">
            {file.name}
          </Text>
          <Text size="xs" variant="dark">
            {formatBytes(file.size)}
          </Text>
        </div>
      </div>
      {download &&
        (file.link ? (
          <Link href={file.link} target="_blank">
            <Button size="sm" variant="text" className="text-sm">
              Unduh
            </Button>
          </Link>
        ) : (
          <Button size="sm" variant="text" className="text-sm">
            Unduh
          </Button>
        ))}
    </div>
  )
}
