import { Badge, Button, Card, Text } from '@/components/ui'
import RandomCoverImage from '@/components/ui/random/cover-image'
import { routes } from '@/config/routes'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'
import Link from 'next/link'
import { BsCheckCircleFill } from 'react-icons/bs'
import { Progressbar } from 'rizzui'

type KelasCardProps = {
  program: string
  kelas?: string
  image?: string | StaticImport
  instansi?: string
  instansiCentang?: boolean
  pengajar: string
}

export default function KelasCard({
  program,
  kelas,
  image,
  instansi,
  instansiCentang,
  pengajar,
}: KelasCardProps) {
  return (
    <Card className="flex flex-col gap-y-2 h-fit">
      <div className="h-32 rounded overflow-clip">
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
      <div className="flex flex-col">
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
      <div className="flex">
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
                  Jumlah Peserta
                </Text>
                <Text size="sm" weight="medium">
                  36 Orang
                </Text>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex flex-col gap-y-1">
        <div className="flex justify-between gap-x-2">
          <Text size="sm" weight="semibold">
            Sesi Pembelajaran
          </Text>
          <Text size="sm" weight="semibold">
            10/16
          </Text>
        </div>
        <Progressbar
          variant="solid"
          color="success"
          rounded="none"
          className="gap-0"
          value={Math.round((10 / 16) * 100)}
        />
      </div>
      <Link
        href={`${routes.penggunaAkademik.ruangKelasDikelola}/akademik/kelas`}
      >
        <Button as="span" size="sm" className="w-full">
          Masuk Kelas
        </Button>
      </Link>
    </Card>
  )
}
