import { ActionIcon, Badge, Button, Card, Text } from '@/components/ui'
import RandomCoverImage from '@/components/ui/random/cover-image'
import { routes } from '@/config/routes'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'
import Link from 'next/link'
import { BiMessageAltDots } from 'react-icons/bi'
import { BsCheckCircleFill, BsClipboardPlus } from 'react-icons/bs'
import { GrShareOption } from 'react-icons/gr'
import { PiGear, PiTrash } from 'react-icons/pi'

type KelasCardProps = {
  id: string
  program: string
  kelas?: string
  tipe?: string
  image?: string | StaticImport
  instansi?: string
  instansiCentang?: boolean
  pengajar: string
  jumlahPeserta: number
  jadwal?: string
  onPengaturan?(id: string): void
  onDelete?(id: string): void
}

export default function KelasCard({
  id,
  program,
  kelas,
  tipe,
  image,
  instansi,
  instansiCentang,
  pengajar,
  jumlahPeserta,
  jadwal,
  onPengaturan,
  onDelete,
}: KelasCardProps) {
  return (
    <Card className="h-fit">
      <div className="aspect-[333/130] rounded overflow-clip">
        {!!image ? (
          <Image
            src={image}
            alt="kelas"
            width={640}
            height={128}
            className="h-full w-full object-cover"
          />
        ) : (
          <RandomCoverImage
            persistentKey={program}
            alt="kelas"
            width={640}
            height={128}
            className="h-full w-full object-cover"
          />
        )}
      </div>
      <div className="flex justify-between items-start mt-2">
        <div>
          <Text weight="semibold" variant="dark">
            {program}
          </Text>
          <Text size="sm" weight="medium" variant="lighter">
            {kelas}
          </Text>
          <div className="flex items-center space-x-1">
            <Text size="sm" weight="medium" variant="lighter">
              {instansi || 'Umum'}
            </Text>
            {instansi && instansiCentang && (
              <BsCheckCircleFill size={10} className="text-primary mt-0.5" />
            )}
          </div>
          <Text size="sm" weight="medium" variant="lighter">
            {pengajar}
          </Text>
        </div>
        <Badge
          size="sm"
          color={tipe === 'Akademik' ? 'primary' : 'success'}
          variant="flat"
        >
          {tipe}
        </Badge>
      </div>
      <div className="flex mt-2">
        <table className="border-collapse border border-gray-100 w-full">
          <tbody>
            <tr>
              <td className="border border-gray-100 p-1">
                <Text size="sm" weight="medium" variant="lighter">
                  Jadwal
                </Text>
                <Text size="sm" weight="medium">
                  {jadwal}
                </Text>
              </td>
              <td className="border border-gray-100 p-1">
                <Text size="sm" weight="medium" variant="lighter">
                  Jumlah Peserta
                </Text>
                <Text size="sm" weight="medium">
                  {jumlahPeserta} Orang
                </Text>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex space-x-1 mt-2">
        <ActionIcon variant="outline">
          <BiMessageAltDots size={18} />
        </ActionIcon>
        <ActionIcon variant="outline">
          <BsClipboardPlus size={18} />
        </ActionIcon>
        <ActionIcon variant="outline">
          <GrShareOption size={18} />
        </ActionIcon>
        <ActionIcon
          variant="outline"
          onClick={() => {
            onPengaturan && onPengaturan(id)
          }}
        >
          <PiGear size={18} />
        </ActionIcon>
        {['Privat', 'Publik'].includes(tipe ?? '') && (
          <ActionIcon
            variant="outline"
            color="danger"
            onClick={() => {
              onDelete && onDelete(id)
            }}
          >
            <PiTrash size={18} />
          </ActionIcon>
        )}
      </div>
      <Link href={`${routes.pengguna.ruangKelas}/${id}`}>
        <Button size="sm" className="w-full mt-2">
          Masuk Kelas
        </Button>
      </Link>
    </Card>
  )
}
