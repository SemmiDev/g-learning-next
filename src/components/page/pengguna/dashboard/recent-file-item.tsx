import {
  ActionIcon,
  FileIcon,
  isPreviewableFile,
  LinkOrDiv,
  PustakaMediaFileType,
  Text,
  Time,
} from '@/components/ui'
import { formatBytes } from '@/utils/bytes'
import { BsEye } from 'react-icons/bs'
import { GoDotFill } from 'react-icons/go'
import { MdOutlineFileDownload } from 'react-icons/md'

type FileButtonProps = {
  file: PustakaMediaFileType
  onPreview?: (file: PustakaMediaFileType) => void
}

export default function RecentFileItem({ file, onPreview }: FileButtonProps) {
  const isPreviewable = isPreviewableFile(file.link ?? '', file.extension)

  return (
    <div className="flex justify-between items-center gap-x-2 border-b border-b-gray-100 select-none transition duration-200 py-3 px-4 hover:bg-gray-50/50">
      <div className="flex gap-x-2">
        <FileIcon file={file} />
        <div className="flex flex-col">
          <Text
            weight="semibold"
            variant="dark"
            title={file.name}
            className="line-clamp-2"
          >
            {file.name}
          </Text>
          <ul className="flex flex-wrap items-center gap-x-1 text-sm text-gray-lighter">
            <li>
              {file.size ? (
                formatBytes(file.size, 2)
              ) : (
                <Time date={file.time} />
              )}
            </li>
            {!!file.size && (
              <>
                <li>
                  <GoDotFill size={10} />
                </li>
                <li>
                  <Time date={file.time} />
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
      <div className="flex gap-x-1">
        {!!file.link && (file.type === 'link' || isPreviewable) && (
          <LinkOrDiv
            href={
              file.type === 'link' && !isPreviewable ? file.link : undefined
            }
            target="_blank"
          >
            <ActionIcon
              size="sm"
              variant="outline-hover-colorful"
              onClick={(e) => {
                e.stopPropagation()
                onPreview && onPreview(file)
              }}
            >
              <BsEye />
            </ActionIcon>
          </LinkOrDiv>
        )}
        {file.type !== 'link' && (
          <LinkOrDiv href={file.link} target="_blank">
            <ActionIcon size="sm" variant="outline-hover-colorful">
              <MdOutlineFileDownload />
            </ActionIcon>
          </LinkOrDiv>
        )}
      </div>
    </div>
  )
}
