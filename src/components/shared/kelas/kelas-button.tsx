import { Text } from '@/components/ui'
import { Radio } from 'rizzui'

export type KelasItemType = {
  id: string
  program: string
  kelas?: string
  instansi?: string
}

export type KelasButtonProps = {
  kelas: KelasItemType
  checked?: boolean
  onChange?(): void
}

export default function KelasButton({
  kelas,
  checked = false,
  onChange,
}: KelasButtonProps) {
  return (
    <>
      <label className="flex items-center border-b border-b-gray-100 select-none transition duration-200 py-3 hover:bg-gray-50/50">
        <Radio
          name="pustaka_media_radio"
          value={kelas.id}
          size="sm"
          className="px-4"
          checked={checked}
          onChange={() => onChange && onChange()}
        />
        <div className="flex flex-1 justify-between items-center space-x-2">
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
