import {
  Button,
  ButtonSubmit,
  Card,
  Checkbox,
  ContentLoader,
  FormError,
  KelasItemType,
  Modal,
  Text,
  Time,
} from '@/components/ui'
import { useAutoSizeLargeModal } from '@/hooks/auto-size-modal/use-large-modal'
import { useSessionJwt } from '@/hooks/use-session-jwt'
import { listSesiPembelajaranApi } from '@/services/api/pengguna/ruang-kelas/sesi-pembelajaran/list'
import { duplikatBahanAjarSesiApi } from '@/services/api/pengguna/ruang-kelas/sesi-pembelajaran/pengajar/duplikat-bahan-ajar-sesi'
import { handleActionWithToast } from '@/utils/action'
import cn from '@/utils/class-names'
import { hourMinute } from '@/utils/text'
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
  LuBook,
  LuCalendar,
  LuClock,
  LuMapPin,
  LuPackage,
} from 'react-icons/lu'
import useInfiniteScroll from 'react-infinite-scroll-hook'

type SesiBahanAjarModalProps = {
  kelasSumber: KelasItemType | undefined
  show: boolean
  onHide: () => void
  onBack: () => void
}

export default function SesiBahanAjarModal({
  kelasSumber,
  show,
  onHide,
  onBack,
}: SesiBahanAjarModalProps) {
  const { jwt, processApi } = useSessionJwt()
  const queryClient = useQueryClient()
  const size = useAutoSizeLargeModal()

  const [checked, setChecked] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState<string>()

  const { kelas: idKelas }: { kelas: string } = useParams()

  const queryKey = [
    'pengguna.ruang-kelas.sesi-pembelajaran.list-duplikat',
    kelasSumber?.id || null,
  ]

  const { data, isLoading, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey,
    queryFn: async ({ pageParam: page }) => {
      const { data } = await listSesiPembelajaranApi({
        jwt,
        page,
        perPage: 50,
        idKelas: kelasSumber?.id || '',
      })

      return {
        list: data?.list ?? [],
        pagination: data?.pagination,
      }
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.pagination?.hasNextPage
        ? (lastPage.pagination?.page ?? 1) + 1
        : undefined,
    enabled: !!kelasSumber,
  })

  const list = data?.pages.flatMap((page) => page.list) ?? []

  const onSubmit = async () => {
    if (!kelasSumber?.id) return

    await handleActionWithToast(
      processApi(duplikatBahanAjarSesiApi, kelasSumber.id, idKelas, checked),
      {
        loading: 'Menyimpan...',
        onStart: () => setIsSubmitting(true),
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [
              'pengguna.ruang-kelas.sesi-pembelajaran.list',
              'pengajar',
              idKelas,
            ],
          })
          onHide()
          setFormError(undefined)
        },
        onError: ({ message }) => setFormError(message),
        onFinish: () => setIsSubmitting(false),
      }
    )
  }

  const handleClose = () => {
    onBack()
    setFormError(undefined)
  }

  const [refSentry] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage: hasNextPage,
    onLoadMore: fetchNextPage,
  })

  useEffect(() => {
    if (show) setChecked([])
  }, [show])

  return (
    <Modal
      title="Pilih Sesi Pembelajaran"
      size={size}
      isOpen={show}
      onClose={handleClose}
      containerClassName="max-h-dvh"
      bodyClassName="justify-between"
      overflow
    >
      <div className="flex flex-col gap-2 overflow-y-auto p-3 lg:max-h-[400px]">
        {list.map((sesi) => (
          <SesiItem
            key={sesi.id}
            judul={sesi.judul}
            pertemuan={sesi.pertemuan}
            totalBahanAjar={sesi.total_bahan_ajar}
            tanggalRealisasi={sesi.tanggal_realisasi}
            hari={sesi.hari}
            waktuMulai={sesi.waktu_mulai}
            waktuSampai={sesi.waktu_sampai}
            lokasi={sesi.lokasi_pertemuan}
            checked={checked.includes(sesi.id)}
            onChange={() =>
              setChecked((checked) => {
                if (checked.includes(sesi.id)) {
                  return checked.filter((id) => id !== sesi.id)
                } else {
                  return [...checked, sesi.id]
                }
              })
            }
          />
        ))}

        {!isLoading && hasNextPage && (
          <ContentLoader ref={refSentry} size="sm" className="py-4" />
        )}

        <FormError error={formError} />
      </div>

      <div className="flex gap-2 border-t border-t-muted p-3 sm:justify-end">
        <ButtonSubmit
          type="button"
          isSubmitting={isSubmitting}
          disabled={checked.length === 0}
          onClick={onSubmit}
          className="w-full"
        >
          Duplikat Bahan Ajar
        </ButtonSubmit>
        <Button variant="outline" className="w-full" onClick={handleClose}>
          Kembali
        </Button>
      </div>
    </Modal>
  )
}

function SesiItem({
  judul,
  pertemuan,
  totalBahanAjar,
  tanggalRealisasi,
  hari,
  waktuMulai,
  waktuSampai,
  lokasi,
  checked = false,
  onChange,
}: {
  judul: string
  pertemuan: number
  totalBahanAjar: number
  tanggalRealisasi: string | null
  hari: string | null
  waktuMulai: string
  waktuSampai: string
  lokasi: string
  checked?: boolean
  onChange: (checked: boolean) => void
}) {
  return (
    <label
      className={cn('cursor-pointer', {
        'cursor-not-allowed': totalBahanAjar === 0,
      })}
    >
      <Card className="flex gap-3 p-3">
        <Checkbox
          size="sm"
          className="text-gray-lighter text-xs"
          iconClassName="h-3 top-1"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={totalBahanAjar === 0}
        />
        <div className="flex flex-col gap-y-2">
          <div className="flex justify-between items-start gap-x-2">
            <div className="flex items-center gap-x-2 gap-y-1 flex-wrap">
              <Text weight="semibold">{judul}</Text>
            </div>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1.5">
            <div className="flex items-center gap-x-1">
              <LuPackage className="size-4 text-gray-lighter" />
              <Text size="sm" weight="medium">
                Sesi {pertemuan}
              </Text>
            </div>
            <div className="flex items-center gap-x-1">
              <LuBook className="size-4 text-gray-lighter" />
              <Text
                size="sm"
                weight="medium"
                color={totalBahanAjar ? 'gray' : 'danger'}
              >
                {totalBahanAjar} Bahan Ajar
              </Text>
            </div>
            <div className="flex items-center gap-x-1">
              <LuCalendar className="size-4 text-gray-lighter" />
              <Text size="sm" weight="medium">
                <Time
                  date={tanggalRealisasi}
                  format="dateday"
                  empty={hari || '-'}
                />
              </Text>
            </div>
            <div className="flex items-center gap-x-1">
              <LuClock className="size-4 text-gray-lighter" />
              <Text size="sm" weight="medium">
                {hourMinute(waktuMulai)} - {hourMinute(waktuSampai)}
              </Text>
            </div>
            <div className="flex items-center gap-x-1">
              <LuMapPin className="size-4 text-gray-lighter" />
              <Text size="sm" weight="medium">
                {lokasi || '-'}
              </Text>
            </div>
          </div>
        </div>
      </Card>
    </label>
  )
}
