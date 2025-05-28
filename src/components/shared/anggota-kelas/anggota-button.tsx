import { Text, Thumbnail } from '@/components/ui'
import { Radio } from 'rizzui'

export type AnggotaKelasItemType = {
  id: string
  nama: string
  email?: string
  foto?: string
  peran: 'Pengajar' | 'Peserta'
}

export type AnggotaKelasButtonProps = {
  anggota: AnggotaKelasItemType
  checked?: boolean
  onChange?(): void
  onDoubleClick?(): void
}

export default function AnggotaKelasButton({
  anggota,
  checked = false,
  onChange,
  onDoubleClick,
}: AnggotaKelasButtonProps) {
  return (
    <>
      <label
        className="flex items-center border-b border-b-gray-100 select-none transition duration-200 py-3 hover:bg-gray-50/50"
        onDoubleClick={() => onDoubleClick && onDoubleClick()}
      >
        <Radio
          name="anggota_radio"
          value={anggota.id}
          size="sm"
          className="px-4"
          checked={checked}
          onChange={() => onChange && onChange()}
        />
        <div className="flex flex-1 items-center gap-x-2">
          <Thumbnail
            src={anggota.foto}
            alt="profil"
            size={40}
            avatar={anggota.nama}
          />

          <div className="flex flex-col">
            <Text
              size="sm"
              weight="semibold"
              variant="dark"
              title={anggota.nama}
              className="truncate"
            >
              {anggota.nama}
            </Text>

            <Text
              size="xs"
              weight="medium"
              variant="lighter"
              className="truncate"
            >
              {anggota.email || '-'}
            </Text>
          </div>
        </div>
      </label>
    </>
  )
}
