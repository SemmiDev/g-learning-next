import { ActionIcon, Button, Card, Text } from '@/components/ui'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'
import { BiMessageAltDots } from 'react-icons/bi'
import { BsClipboardPlus } from 'react-icons/bs'
import { GrShareOption } from 'react-icons/gr'
import { Badge } from 'rizzui'

type CardKelasProps = {
  program: string
  kelas?: string
  instansi?: string
  akses?: 'Publik' | 'Private'
  image: string | StaticImport
}

export default function CardKelas({
  program,
  kelas,
  instansi,
  akses = 'Private',
  image,
}: CardKelasProps) {
  return (
    <Card>
      <div className="aspect-[333/130] rounded overflow-clip">
        <Image src={image} alt="kelas" className="h-full w-full object-cover" />
      </div>
      <div className="flex justify-between items-start mt-2">
        <div>
          <Text weight="semibold" variant="dark">
            {program}
          </Text>
          <Text size="sm" weight="medium" variant="lighter">
            {kelas}
          </Text>
          <Text size="sm" weight="medium" variant="lighter">
            {instansi}
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
      {/* <Link href={routes.peserta.kelas}> */}
      <Button size="sm" className="w-full mt-2">
        Masuk Kelas
      </Button>
      {/* </Link> */}
    </Card>
  )
}
