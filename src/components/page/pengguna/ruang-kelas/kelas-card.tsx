import { DataType as DataListKelasType } from '@/actions/pengguna/ruang-kelas/list'
import { ActionIcon, Badge, Button, Card, Text } from '@/components/ui'
import RandomCoverImage from '@/components/ui/random/cover-image'
import { routes } from '@/config/routes'
import Image from 'next/image'
import Link from 'next/link'
import { BiMessageAltDots } from 'react-icons/bi'
import { BsCheckCircleFill, BsClipboardPlus } from 'react-icons/bs'
import { GrShareOption } from 'react-icons/gr'
import { PiGear, PiTrash } from 'react-icons/pi'

type KelasCardProps = {
  data: DataListKelasType
  onPengaturan?(id: string): void
  onUndang?(id: string): void
  onDelete?(id: string): void
}

export default function KelasCard({
  data,
  onPengaturan,
  onUndang,
  onDelete,
}: KelasCardProps) {
  return (
    <Card className="h-fit">
      <div className="h-32 rounded overflow-clip">
        {!!data.kelas.thumbnail ? (
          <Image
            src={data.kelas.thumbnail}
            alt="kelas"
            width={640}
            height={128}
            className="h-full w-full object-cover"
          />
        ) : (
          <RandomCoverImage
            persistentKey={data.kelas.id}
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
            {data.kelas.nama_kelas}
          </Text>
          <Text size="sm" weight="medium" variant="lighter">
            {data.kelas.sub_judul}
          </Text>
          <div className="flex items-center space-x-1">
            <Text size="sm" weight="medium" variant="lighter">
              {data.kelas.nama_instansi || 'Umum'}
            </Text>
            {!!data.kelas.nama_instansi && (
              <BsCheckCircleFill size={10} className="text-primary mt-0.5" />
            )}
          </div>
          <Text size="sm" weight="medium" variant="lighter">
            {data.nama_pemilik}
          </Text>
        </div>
        <Badge
          size="sm"
          color={data.kelas.tipe === 'Akademik' ? 'primary' : 'success'}
          variant="flat"
        >
          {data.kelas.tipe}
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
                  {data.jadwal && data.jadwal.length > 0
                    ? `${
                        data.jadwal[0].hari
                      }, ${data.jadwal[0].waktu_mulai.substring(
                        0,
                        5
                      )} - ${data.jadwal[0].waktu_sampai.substring(0, 5)}`
                    : '-'}
                </Text>
              </td>
              <td className="border border-gray-100 p-1">
                <Text size="sm" weight="medium" variant="lighter">
                  Jumlah Peserta
                </Text>
                <Text size="sm" weight="medium">
                  {data.total_peserta} Orang
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
        {data.kelas.tipe !== 'Akademik' && (
          <>
            <ActionIcon
              variant="outline"
              onClick={() => {
                onUndang && onUndang(data.kelas.id)
              }}
            >
              <GrShareOption size={18} />
            </ActionIcon>
            {data.peran === 'Pengajar' && (
              <>
                <ActionIcon
                  variant="outline"
                  onClick={() => {
                    onPengaturan && onPengaturan(data.kelas.id)
                  }}
                >
                  <PiGear size={18} />
                </ActionIcon>
                <ActionIcon
                  variant="outline"
                  color="danger"
                  onClick={() => {
                    onDelete && onDelete(data.kelas.id)
                  }}
                >
                  <PiTrash size={18} />
                </ActionIcon>
              </>
            )}
          </>
        )}
      </div>
      {data.peran === 'Pengajar' || data.status === 'Diterima' ? (
        <Link href={`${routes.pengguna.ruangKelas}/${data.kelas.id}`}>
          <Button as="span" size="sm" className="w-full mt-2">
            Masuk Kelas
          </Button>
        </Link>
      ) : (
        <Button
          as="span"
          size="sm"
          variant="outline-colorful"
          color="success"
          className="w-full mt-2"
        >
          Menunggu Persetujuan
        </Button>
      )}
    </Card>
  )
}
