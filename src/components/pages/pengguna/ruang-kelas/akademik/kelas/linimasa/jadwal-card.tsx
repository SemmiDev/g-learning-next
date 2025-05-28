import {
  Badge,
  Button,
  Card,
  CardSeparator,
  LinkOrDiv,
  Loader,
  ModalConfirm,
  Text,
  Time,
  Title,
} from '@/components/ui'
import { routes } from '@/config/routes'
import { useSessionJwt } from '@/hooks/use-session-jwt'
import { useShowModal } from '@/hooks/use-show-modal'
import { jadwalKelasApi } from '@/services/api/pengguna/ruang-kelas/aktifitas/akademik/jadwal-kelas'
import { DataType as DataKelasType } from '@/services/api/pengguna/ruang-kelas/lihat'
import cn from '@/utils/class-names'
import { hourMinute } from '@/utils/text'
import { useRouter } from '@bprogress/next/app'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { ComponentType, Dispatch, SetStateAction, useState } from 'react'
import {
  BsCardChecklist,
  BsClipboardPlus,
  BsFileRichtext,
  BsWebcam,
} from 'react-icons/bs'
import { IconBaseProps } from 'react-icons/lib'
import { LuBook, LuClock, LuMapPin, LuPackage } from 'react-icons/lu'
import { Popover } from 'rizzui'
import TambahKonferensiSesiModal from '../sesi-pembelajaran/sesi/pengajar/modal/tambah-konferensi'
import TambahMateriSesiModal from '../sesi-pembelajaran/sesi/pengajar/modal/tambah-materi'
import TambahTugasSesiModal from '../sesi-pembelajaran/sesi/pengajar/modal/tambah-tugas'
import TambahUjianSesiModal from '../sesi-pembelajaran/sesi/pengajar/modal/tambah-ujian'

const HARI = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']

type JadwalCardProps = {
  kelas: DataKelasType | undefined
  className?: string
}

export default function JadwalCard({ kelas, className }: JadwalCardProps) {
  const { jwt } = useSessionJwt()
  const router = useRouter()

  const [idSesiMulai, setIdSesiMulai] = useState<string>()
  const {
    show: showTambahMateri,
    key: keyTambahMateri,
    doShow: doShowTambahMateri,
    doHide: doHideTambahMateri,
  } = useShowModal<string>()
  const {
    show: showTambahTugas,
    key: keyTambahTugas,
    doShow: doShowTambahTugas,
    doHide: doHideTambahTugas,
  } = useShowModal<string>()
  const {
    show: showTambahUjian,
    key: keyTambahUjian,
    doShow: doShowTambahUjian,
    doHide: doHideTambahUjian,
  } = useShowModal<string>()
  const {
    show: showTambahKonferensi,
    key: keyTambahKonferensi,
    doShow: doShowTambahKonferensi,
    doHide: doHideTambahKonferensi,
  } = useShowModal<string>()

  const { kelas: idKelas }: { kelas: string } = useParams()

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const [currentDay, setCurrentDay] = useState(today.getDay())

  const queryKey = [
    'pengguna.ruang-kelas.linimasa.list-jadwal-kelas',
    HARI[currentDay],
  ]

  const { data, isLoading } = useQuery({
    queryKey,
    queryFn: async () => {
      const { data } = await jadwalKelasApi({
        jwt,
        idKelas,
        hari: HARI[currentDay],
      })

      return data?.list?.[0] ?? null
    },
  })

  const jenisKelas = kelas?.peran === 'Pengajar' ? 'dikelola' : 'diikuti'

  return (
    <>
      <Card className={cn('p-0', className)}>
        <div className="flex flex-wrap justify-between items-center gap-x-2 p-2">
          <Title as="h5" weight="semibold">
            Jadwal Minggu Ini
          </Title>
          <Text size="sm" weight="medium" variant="lighter">
            Tanggal hari ini: <Time date={today} />
          </Text>
        </div>
        <Tanggal
          currentDay={currentDay}
          setCurrentDay={setCurrentDay}
          className="mx-1 mb-1"
        />
        <CardSeparator />
        <div className="flex flex-col px-1">
          {isLoading ? (
            <Loader className="py-4" />
          ) : data ? (
            <div className="flex flex-col gap-y-1 [&:not(:last-child)]:border-b border-b-muted px-1 py-2">
              <div className="flex items-center flex-wrap gap-x-2">
                <Text weight="semibold">{data.judul}</Text>

                <div className="flex gap-x-2 gap-y-1 flex-wrap">
                  {data.status !== 'Belum Dibuka' && (
                    <Badge size="sm" variant="outline" color="gray">
                      {data.nama_pengajar}
                    </Badge>
                  )}
                  {data.status !== 'Telah Berakhir' && (
                    <Badge
                      size="sm"
                      variant="flat"
                      color={
                        data.status === 'Sedang Berlangsung'
                          ? 'success'
                          : 'gray'
                      }
                    >
                      {data.status === 'Sedang Berlangsung'
                        ? 'Sesi sedang berlangsung'
                        : 'Sesi belum dimulai'}
                    </Badge>
                  )}
                </div>
              </div>
              <div className="flex gap-x-4 gap-y-1.5 flex-wrap mt-1">
                <div className="flex items-center gap-x-1">
                  <LuPackage className="size-4 text-gray-lighter" />
                  <Text size="sm" weight="medium">
                    Sesi {data.pertemuan}
                  </Text>
                </div>
                <div className="flex items-center gap-x-1">
                  <LuBook className="size-4 text-gray-lighter" />
                  <Text size="sm" weight="medium" color="gray">
                    {data.total_bahan_ajar || '0'} Bahan Ajar
                  </Text>
                </div>
                <div className="flex items-center gap-x-1">
                  <LuClock className="size-4 text-gray-lighter" />
                  <Text size="sm" weight="medium">
                    {hourMinute(data.waktu_mulai)} -{' '}
                    {hourMinute(data.waktu_sampai)}
                  </Text>
                </div>
                <div className="flex items-center gap-x-1">
                  <LuMapPin className="size-4 text-gray-lighter" />
                  <Text size="sm" weight="medium">
                    {data.lokasi_pertemuan}
                  </Text>
                </div>
              </div>
              <div className="flex gap-x-2 mt-2">
                {kelas?.peran === 'Pengajar' && (
                  <Popover>
                    <Popover.Trigger>
                      <Button
                        size="sm"
                        variant="outline-colorful"
                        className="flex-1"
                      >
                        Tambah Bahan Ajar
                      </Button>
                    </Popover.Trigger>
                    <Popover.Content className="flex flex-col px-0 py-1">
                      {({ setOpen }) => (
                        <>
                          <PopoverItem
                            title="Materi"
                            color="green"
                            Icon={BsFileRichtext}
                            setOpen={setOpen}
                            onClick={() => doShowTambahMateri(data.id)}
                          />
                          <PopoverItem
                            title="Tugas"
                            color="violet"
                            Icon={BsClipboardPlus}
                            setOpen={setOpen}
                            onClick={() => doShowTambahTugas(data.id)}
                          />
                          <PopoverItem
                            title="Ujian"
                            color="blue"
                            Icon={BsCardChecklist}
                            setOpen={setOpen}
                            onClick={() => doShowTambahUjian(data.id)}
                          />
                          <PopoverItem
                            title="Konferensi"
                            color="red"
                            Icon={BsWebcam}
                            setOpen={setOpen}
                            onClick={() => doShowTambahKonferensi(data.id)}
                          />
                        </>
                      )}
                    </Popover.Content>
                  </Popover>
                )}
                {data.status === 'Belum Dibuka' &&
                kelas?.peran === 'Pengajar' ? (
                  <Button
                    size="sm"
                    className="flex-1"
                    onClick={() => setIdSesiMulai(data.id)}
                  >
                    Mulai Sesi
                  </Button>
                ) : (
                  <LinkOrDiv
                    href={`${routes.pengguna.ruangKelas[jenisKelas].akademik}/${data.id_kelas}/sesi-pembelajaran/${data.id}`}
                    disabled={data.status !== 'Sedang Berlangsung'}
                    className="flex-1"
                  >
                    <Button
                      as="span"
                      size="sm"
                      className="w-full"
                      disabled={data.status !== 'Sedang Berlangsung'}
                    >
                      Masuk Sesi
                    </Button>
                  </LinkOrDiv>
                )}
              </div>
            </div>
          ) : (
            <Text
              size="sm"
              weight="medium"
              variant="lighter"
              className="text-center my-4"
            >
              Tidak ada jadwal
            </Text>
          )}
        </div>
      </Card>

      {kelas?.peran === 'Pengajar' && (
        <>
          <ModalConfirm
            title="Mulai Sesi"
            isOpen={!!idSesiMulai}
            onClose={() => setIdSesiMulai(undefined)}
            desc="Apakah anda yakin ingin memulai sesi pembelajaran?"
            confirm="Ya, mulai"
            closeOnCancel
            onConfirm={() => {
              router.push(
                `${routes.pengguna.ruangKelas.dikelola.akademik}/${idKelas}/sesi-pembelajaran/${idSesiMulai}/mulai`
              )
            }}
          />

          <TambahMateriSesiModal
            idSesi={keyTambahMateri}
            show={showTambahMateri}
            onHide={doHideTambahMateri}
          />

          <TambahTugasSesiModal
            idSesi={keyTambahTugas}
            show={showTambahTugas}
            onHide={doHideTambahTugas}
          />

          <TambahUjianSesiModal
            idSesi={keyTambahUjian}
            show={showTambahUjian}
            onHide={doHideTambahUjian}
          />

          <TambahKonferensiSesiModal
            idSesi={keyTambahKonferensi}
            show={showTambahKonferensi}
            onHide={doHideTambahKonferensi}
          />
        </>
      )}
    </>
  )
}

function Tanggal({
  currentDay,
  setCurrentDay,
  className,
}: {
  currentDay?: number
  setCurrentDay?: any
  className?: string
}) {
  const curr = new Date()
  curr.setHours(0, 0, 0, 0)

  const first = curr.getDate() - curr.getDay()

  return (
    <div className={cn('flex justify-between', className)}>
      {[...Array(7)].map((_, i) => {
        return (
          <TanggalItem
            key={i}
            date={new Date(curr.setDate(first + i))}
            active={currentDay == i}
            onClick={() => setCurrentDay(i)}
          />
        )
      })}
    </div>
  )
}

function TanggalItem({
  date,
  active,
  onClick,
}: {
  date: Date
  active?: boolean
  onClick?: () => void
}) {
  return (
    <button
      className="flex flex-col items-center gap-y-1 rounded w-full py-2 hover:bg-muted sm:px-2"
      onClick={onClick}
    >
      <Text
        size="sm"
        weight="semibold"
        color={active ? 'primary' : 'gray'}
        variant={active ? 'dark' : 'default'}
      >
        <span className="hidden sm:block">
          <Time date={date} customFormat="dddd" />
        </span>
        <span className="sm:hidden">
          <Time date={date} customFormat="ddd" />
        </span>
      </Text>
      <div
        className={cn(
          'flex justify-center items-center size-6 md:size-8',
          active ? 'bg-primary rounded-full' : ''
        )}
      >
        <Text
          size="sm"
          weight="semibold"
          className={cn(active ? 'text-white' : 'text-gray')}
        >
          <Time date={date} customFormat="DD" />
        </Text>
      </div>
    </button>
  )
}

function PopoverItem({
  title,
  color,
  Icon,
  setOpen,
  onClick,
}: {
  title: string
  color: 'green' | 'violet' | 'blue' | 'red' | 'indigo'
  Icon: ComponentType<IconBaseProps>
  setOpen?: Dispatch<SetStateAction<boolean>>
  onClick?: () => void
}) {
  return (
    <button
      className="flex gap-x-2 px-2 py-1 hover:bg-muted/40"
      onClick={() => {
        onClick && onClick()
        setOpen && setOpen(false)
      }}
    >
      <div
        className={cn(
          'flex justify-center items-center size-[1.375rem] rounded-sm',
          `btn-item-${color}`
        )}
      >
        <Icon className="size-2.5" />
      </div>
      <Text size="sm" weight="semibold">
        {title}
      </Text>
    </button>
  )
}
