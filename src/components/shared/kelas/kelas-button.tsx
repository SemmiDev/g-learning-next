import { Text } from '@/components/ui'
import RandomCoverImage from '@/components/ui/random/cover-image'
import Image from 'next/image'
import { Radio } from 'rizzui'

export type KelasItemType = {
  id: string
  program: string
  kelas?: string
  instansi?: string
  cover?: string
}

export type KelasButtonProps = {
  kelas: KelasItemType
  checked?: boolean
  onChange?(): void
  onDoubleClick?(): void
}

export default function KelasButton({
  kelas,
  checked = false,
  onChange,
  onDoubleClick,
}: KelasButtonProps) {
  return (
    <>
      <label
        className="flex items-center border-b border-b-gray-100 select-none transition duration-200 py-3 hover:bg-gray-50/50"
        onDoubleClick={() => onDoubleClick && onDoubleClick()}
      >
        <Radio
          name="kelas_radio"
          value={kelas.id}
          size="sm"
          className="px-4"
          checked={checked}
          onChange={() => onChange && onChange()}
        />
        <div className="flex flex-1 items-center gap-x-2">
          <div className="h-16 max-w-20 rounded overflow-clip">
            {!!kelas.cover ? (
              <Image
                src={kelas.cover}
                alt="kelas"
                width={64}
                height={64}
                className="h-full w-full object-cover"
              />
            ) : (
              <RandomCoverImage
                persistentKey={kelas.id}
                alt="kelas"
                width={64}
                height={64}
                className="h-full w-full object-cover"
              />
            )}
          </div>
          <div className="flex flex-col">
            <Text
              size="sm"
              weight="semibold"
              variant="dark"
              title={kelas.program}
              className="truncate"
            >
              {kelas.program}
            </Text>
            {kelas.kelas && (
              <Text
                size="sm"
                weight="medium"
                variant="lighter"
                title={kelas.kelas}
                className="truncate"
              >
                {kelas.kelas}
              </Text>
            )}

            <Text
              size="sm"
              weight="medium"
              variant="lighter"
              title={kelas.instansi}
              className="truncate"
            >
              {kelas.instansi || 'Umum'}
            </Text>
          </div>
        </div>
      </label>
    </>
  )
}
