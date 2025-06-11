import { Card, Text } from '@/components/ui'
import RandomCoverImage from '@/components/ui/random/cover-image'
import Image from 'next/image'
import { BsCheckCircleFill } from 'react-icons/bs'
import { Progressbar } from 'rizzui'

type KelasCardProps = {}

export default function KelasCard({}: KelasCardProps) {
  const pertemuan = 10
  const totalPertemuan = 16
  const persentasePertemuan =
    totalPertemuan > 0 ? Math.round((pertemuan / totalPertemuan) * 100) : 100

  return (
    <Card className="flex flex-col gap-y-2 h-fit">
      <div className="h-32 rounded overflow-clip">
        {false ? (
          <Image
            src={'https://placehold.co/600x400/EEE/31343C'}
            alt="kelas"
            width={640}
            height={128}
            className="h-full w-full object-cover"
          />
        ) : (
          <RandomCoverImage
            persistentKey={'123456'}
            alt="kelas"
            width={640}
            height={128}
            className="h-full w-full object-cover"
          />
        )}
      </div>
      <div className="flex flex-col">
        <Text weight="semibold" variant="dark">
          ILMU NEGARA
        </Text>
        <Text size="sm" weight="medium" variant="lighter">
          B
        </Text>
        <Text size="sm" weight="medium" variant="lighter">
          2024/2025 Ganjil
        </Text>

        <Text size="sm" weight="medium" variant="lighter">
          Febrian Chandra, S.H.,M.H
        </Text>
        {/* {data.pengajar.length === 1 ? (
          <Text size="sm" weight="medium" variant="lighter">
            {data.pengajar[0].nama}
          </Text>
        ) : (
          <ul className="text-sm font-medium text-gray-lighter">
            {data.pengajar.map((pengajar) => (
              <li key={pengajar.id} className="flex items-center gap-x-1">
                <Circle className="size-1" />
                {pengajar.nama}
              </li>
            ))}
          </ul>
        )} */}
      </div>
      <div className="flex">
        <table className="border-collapse border border-gray-100 w-full">
          <tbody>
            <tr>
              <td valign="top" className="border border-gray-100 p-1">
                <Text size="sm" weight="medium" variant="lighter">
                  Jadwal
                </Text>
                <Text size="sm" weight="medium">
                  Rabu, 11:00 - 12:39
                  {/* {data.jadwal && data.jadwal.length > 0
                    ? data.jadwal.map((jadwal, idx) => (
                        <Fragment key={idx}>
                          {jadwal.hari}, {hourMinute(jadwal.waktu_mulai)} -{' '}
                          {hourMinute(jadwal.waktu_sampai)}
                          <br />
                        </Fragment>
                      ))
                    : '-'} */}
                </Text>
              </td>
              <td valign="top" className="border border-gray-100 p-1">
                <Text size="sm" weight="medium" variant="lighter">
                  Jumlah Peserta
                </Text>
                <Text size="sm" weight="medium">
                  20 Orang
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
            {pertemuan}/{totalPertemuan}
          </Text>
        </div>
        <Progressbar
          variant="solid"
          color="success"
          rounded="none"
          className="gap-0"
          value={persentasePertemuan}
        />
      </div>
      <div className="flex flex-col gap-y-1">
        <div className="flex justify-between gap-x-2">
          <Text size="sm" weight="semibold">
            Kehadiran Peserta
          </Text>
          <Text size="sm" weight="semibold">
            {pertemuan}/{totalPertemuan}
          </Text>
        </div>
        <Progressbar
          variant="solid"
          color="success"
          rounded="none"
          className="gap-0"
          value={persentasePertemuan}
        />
      </div>
      <div className="flex flex-col gap-y-1">
        <div className="flex justify-between gap-x-2">
          <Text size="sm" weight="semibold">
            Kehadiran Pengajar
          </Text>
          <Text size="sm" weight="semibold">
            {pertemuan}/{totalPertemuan}
          </Text>
        </div>
        <Progressbar
          variant="solid"
          color="success"
          rounded="none"
          className="gap-0"
          value={persentasePertemuan}
        />
      </div>
    </Card>
  )
}
