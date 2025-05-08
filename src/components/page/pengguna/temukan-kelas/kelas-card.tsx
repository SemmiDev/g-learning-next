import { DataType as DataKelasType } from '@/actions/pengguna/temukan-kelas/list'
import { Badge, Button, Card, Text } from '@/components/ui'
import RandomCoverImage from '@/components/ui/random/cover-image'
import { routes } from '@/config/routes'
import { useSessionPengguna } from '@/hooks/use-session-pengguna'
import Image from 'next/image'
import Link from 'next/link'

type KelasCardProps = {
  data: DataKelasType
  onGabung?(kode: string): void
}

export default function KelasCard({ data, onGabung }: KelasCardProps) {
  const { id: idPengguna } = useSessionPengguna()

  return (
    <Card className="flex flex-col gap-y-2 h-fit">
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
      <div className="flex flex-col">
        <Text weight="semibold" variant="dark">
          {data.kelas.nama_kelas}
        </Text>
        <Text size="sm" weight="medium" variant="lighter">
          {data.kelas.sub_judul}
        </Text>
        <Text size="sm" weight="medium" variant="lighter">
          {data.nama_pemilik}
        </Text>
      </div>
      <div className="flex">
        <table className="border-collapse border border-gray-100 w-full">
          <tbody>
            <tr>
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
      {idPengguna === data.kelas.id_pengajar || data.status === 'Diterima' ? (
        <Link
          href={
            idPengguna === data.kelas.id_pengajar
              ? `${routes.pengguna.ruangKelas.dikelola.umum}/${data.kelas.id}`
              : `${routes.pengguna.ruangKelas.diikuti.umum}/${data.kelas.id}`
          }
        >
          <Button
            as="span"
            size="sm"
            variant="outline-colorful"
            className="w-full"
          >
            Masuk ke Kelas
          </Button>
        </Link>
      ) : (
        <Button
          as={data.status ? 'span' : 'button'}
          size="sm"
          variant={data.status ? 'outline-colorful' : 'solid'}
          color={data.status ? 'success' : 'primary'}
          className="w-full"
          onClick={() =>
            !data.status && onGabung && onGabung(data.kelas.kode_unik)
          }
        >
          {data.status === 'Pengajuan'
            ? 'Menunggu Persetujuan'
            : 'Ajukan Bergabung'}
        </Button>
      )}
    </Card>
  )
}
