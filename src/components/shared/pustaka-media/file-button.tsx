import {
  ActionIconTooltip,
  FileIcon,
  isPreviewableFile,
  LinkOrDiv,
  Text,
  Time,
} from '@/components/ui'
import { formatBytes } from '@/utils/bytes'
import { BiTrashAlt } from 'react-icons/bi'
import { BsEye, BsPencil } from 'react-icons/bs'
import { GoDotFill } from 'react-icons/go'
import { MdOutlineFileDownload } from 'react-icons/md'
import { Checkbox, Radio } from 'rizzui'
import { FileType } from './pustaka-media'

export type FileButtonProps = {
  file: FileType
  checked?: boolean
  onChange?(val: boolean): void
  multiple: boolean
  onEdit?: (file: FileType) => void
  onDelete?: (file: FileType) => void
  onPreview?: (file: FileType) => void
}

export default function FileButton({
  file,
  checked = false,
  onChange,
  multiple,
  onEdit,
  onDelete,
  onPreview,
}: FileButtonProps) {
  return (
    <>
      <label className="flex border-b border-b-gray-100 select-none transition duration-200 py-2.5 hover:bg-gray-50/50">
        <div className="mt-3">
          {multiple ? (
            <Checkbox
              size="sm"
              className="px-3"
              iconClassName="h-4 top-0.5 left"
              checked={checked}
              onChange={(e) => {
                onChange && onChange(e.target.checked)
              }}
            />
          ) : (
            <Radio
              name="pustaka_media_radio"
              value={file.id}
              size="sm"
              className="px-3"
              checked={checked}
              onChange={() => onChange && onChange(true)}
            />
          )}
        </div>
        <div className="flex flex-1 justify-between items-center space-x-2">
          <div className="flex space-x-2">
            <FileIcon file={file} />
            <div className="flex flex-col">
              <Text
                weight="semibold"
                variant="dark"
                title={file.name}
                className="truncate"
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
          <div className="flex flex-wrap justify-end space-x-1 pr-4">
            {!!file.link &&
              (file.type === 'link' ||
                isPreviewableFile(file.link, file.extension)) && (
                <LinkOrDiv
                  href={file.type === 'link' ? file.link : undefined}
                  target="_blank"
                >
                  <ActionIconTooltip
                    tooltip="Lihat"
                    size="sm"
                    variant="outline-hover-colorful"
                    onClick={(e) => {
                      e.stopPropagation()
                      onPreview && onPreview(file)
                    }}
                  >
                    <BsEye />
                  </ActionIconTooltip>
                </LinkOrDiv>
              )}
            {file.type !== 'link' && (
              <LinkOrDiv href={file.link} target="_blank">
                <ActionIconTooltip
                  tooltip="Unduh"
                  size="sm"
                  variant="outline-hover-colorful"
                  onClick={(e) => {
                    e.stopPropagation()
                  }}
                >
                  <MdOutlineFileDownload />
                </ActionIconTooltip>
              </LinkOrDiv>
            )}
            <ActionIconTooltip
              tooltip="Ubah"
              size="sm"
              variant="outline-hover-colorful"
              color="warning"
              onClick={() => onEdit && onEdit(file)}
            >
              <BsPencil />
            </ActionIconTooltip>
            <ActionIconTooltip
              tooltip="Hapus"
              size="sm"
              variant="outline-hover-colorful"
              color="danger"
              onClick={(e) => {
                e.stopPropagation()
                onDelete && onDelete(file)
              }}
            >
              <BiTrashAlt />
            </ActionIconTooltip>
          </div>
        </div>
      </label>
    </>
  )
}
