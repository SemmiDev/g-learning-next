import Card from '@/components/ui/card'
import { routes } from '@/config/routes'
import Image from 'next/image'
import Link from 'next/link'
import { BiMessageAltDots } from 'react-icons/bi'
import { BsClipboardPlus } from 'react-icons/bs'
import { GrShareOption } from 'react-icons/gr'
import { PiGear } from 'react-icons/pi'
import { ActionIcon, Badge, Button, Text } from 'rizzui'

export default function CardKelas({ image }: { image: any }) {
  return (
    <Card>
      <div className="aspect-[333/130] rounded overflow-clip">
        <Image src={image} alt="kelas" className="h-full w-full object-cover" />
      </div>
      <div className="flex justify-between items-start mt-2">
        <div>
          <Text className="text-base font-semibold text-gray-dark">
            Sistem Operasi
          </Text>
          <Text className="font-medium text-gray-lighter">Kelas TI A</Text>
        </div>
        <Badge size="sm" color="success" variant="flat">
          Publik
        </Badge>
      </div>
      <div className="flex mt-2">
        <table className="border-collapse border border-gray-100 w-full">
          <tbody>
            <tr>
              <td className="border border-gray-100 p-1">
                <Text className="font-medium text-gray-lighter">Jadwal</Text>
                <Text className="font-medium text-gray">
                  Senin, 13:00 - 14:00
                </Text>
              </td>
              <td className="border border-gray-100 p-1">
                <Text className="font-medium text-gray-lighter">
                  Jumlah Siswa
                </Text>
                <Text className="font-medium text-gray">36 Orang</Text>
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
        <ActionIcon variant="outline">
          <PiGear size={18} />
        </ActionIcon>
      </div>
      <Link href={routes.kelas}>
        <Button size="sm" className="w-full mt-2">
          Masuk Kelas
        </Button>
      </Link>
    </Card>
  )
}
