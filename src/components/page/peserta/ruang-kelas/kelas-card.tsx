import { ActionIcon, Badge, Button, Card, Text } from '@/components/ui'
import RandomCoverImage from '@/components/ui/random/cover-image'
import { routes } from '@/config/routes'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'
import Link from 'next/link'
import { BiMessageAltDots } from 'react-icons/bi'
import { BsCheckCircleFill, BsClipboardPlus } from 'react-icons/bs'
import { GrShareOption } from 'react-icons/gr'

type KelasCardProps = {
  program: string
  kelas?: string
  akses?: 'Publik' | 'Private'
  image?: string | StaticImport | null
  instansi?: string
  instansiCentang?: boolean
  pengajar: string
}

export default function KelasCard({
  program,
  kelas,
  akses = 'Private',
  image,
  instansi,
  instansiCentang,
  pengajar,
}: KelasCardProps) {
  return (
    <Card>
      <div className="aspect-[333/130] rounded overflow-clip">
        {!!image ? (
          <Image
            src={image}
            alt="kelas"
            className="h-full w-full object-cover"
          />
        ) : (
          <RandomCoverImage persistentKey={program} alt="kelas" />
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
              {instansi || '-'}
            </Text>
            {instansiCentang && (
              <BsCheckCircleFill size={10} className="text-primary mt-0.5" />
            )}
          </div>
          <Text size="sm" weight="medium" variant="lighter">
            {pengajar}
          </Text>
        </div>
        <Badge
          size="sm"
          color={akses == 'Publik' ? 'success' : 'primary'}
          variant={akses == 'Publik' ? 'flat' : 'outline'}
        >
          {akses}
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
                  Senin, 13:00 - 14:00
                </Text>
              </td>
              <td className="border border-gray-100 p-1">
                <Text size="sm" weight="medium" variant="lighter">
                  Jumlah Siswa
                </Text>
                <Text size="sm" weight="medium">
                  36 Orang
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
      </div>
      <Link href={routes.peserta.kelas}>
        <Button size="sm" className="w-full mt-2">
          Masuk Kelas
        </Button>
      </Link>
    </Card>
  )
}
