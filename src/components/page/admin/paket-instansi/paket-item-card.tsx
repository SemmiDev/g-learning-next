import { ActionIconTooltip, Card, CardSeparator, Text } from '@/components/ui'
import { formatBytes } from '@/utils/bytes'
import { rupiah } from '@/utils/text'
import { BsPencilSquare } from 'react-icons/bs'
import { LuTrash2 } from 'react-icons/lu'

export type PaketItemType = {
  nama: string
  totalPenyimpanan: number
  penyimpananPengajar: number
  penyimpananPeserta: number
  limitUser: number
  limitKelas: number
  limitKelasPengajar: number
  harga: number
}

export default function PaketItemCard({ paket }: { paket: PaketItemType }) {
  return (
    <Card className="flex flex-col p-0">
      <Text weight="semibold" variant="dark" className="p-2">
        {paket.nama}
      </Text>
      <CardSeparator />
      <div className="flex flex-col p-2">
        <Text size="xs" weight="medium" variant="dark">
          Detail Paket
        </Text>
        <ul className="text-xs font-medium text-gray-dark list-disc ps-4">
          <li>Total penyimpanan: {formatBytes(paket.totalPenyimpanan)}</li>
          <li>
            Limit penyimpanan pengajar: {formatBytes(paket.penyimpananPengajar)}
          </li>
          <li>
            Limit penyimpanan peserta: {formatBytes(paket.penyimpananPeserta)}
          </li>
          <li>Limit pengguna: {paket.limitUser} User</li>
          <li>Limit kelas: {paket.limitKelas} kelas</li>
          <li>Limit kelas/pengajar: {paket.limitKelasPengajar} kelas</li>
        </ul>
      </div>
      <CardSeparator />
      <Text weight="semibold" variant="dark" className="p-2">
        {rupiah(paket.harga)}
      </Text>
      <CardSeparator />
      <div className="flex space-x-2 p-2">
        <ActionIconTooltip
          tooltip="Ubah"
          size="sm"
          variant="flat-colorful"
          color="warning"
        >
          <BsPencilSquare />
        </ActionIconTooltip>
        <ActionIconTooltip
          tooltip="Hapus"
          size="sm"
          variant="flat-colorful"
          color="danger"
        >
          <LuTrash2 />
        </ActionIconTooltip>
      </div>
    </Card>
  )
}
