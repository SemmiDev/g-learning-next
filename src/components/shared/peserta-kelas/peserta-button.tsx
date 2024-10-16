import { Text, Thumbnail } from '@/components/ui'
import { Radio } from 'rizzui'

export type PesertaKelasItemType = {
  id: string
  nama: string
  email?: string
  foto?: string
}

export type PesertaKelasButtonProps = {
  peserta: PesertaKelasItemType
  checked?: boolean
  onChange?(): void
}

export default function PesertaKelasButton({
  peserta,
  checked = false,
  onChange,
}: PesertaKelasButtonProps) {
  return (
    <>
      <label className="flex items-center border-b border-b-gray-100 select-none transition duration-200 py-3 hover:bg-gray-50/50">
        <Radio
          name="peserta_radio"
          value={peserta.id}
          size="sm"
          className="px-4"
          checked={checked}
          onChange={() => onChange && onChange()}
        />
        <div className="flex flex-1 items-center space-x-2">
          <Thumbnail
            src={peserta.foto}
            alt="profil"
            size={40}
            avatar={peserta.nama}
          />

          <div className="flex flex-col">
            <Text
              size="sm"
              weight="semibold"
              variant="dark"
              title={peserta.nama}
              className="truncate"
            >
              {peserta.nama}
            </Text>

            <Text
              size="xs"
              weight="medium"
              variant="lighter"
              className="truncate"
            >
              {peserta.email || '-'}
            </Text>
          </div>
        </div>
      </label>
    </>
  )
}
