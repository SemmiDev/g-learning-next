import { Button, Card, ContentLoader, Shimmer, Title } from '@/components/ui'
import { useSessionJwt } from '@/hooks/use-session-jwt'
import { useShowModal } from '@/hooks/use-show-modal'
import { listAktifitasApi } from '@/services/api/pengguna/ruang-kelas/aktifitas/list'
import { DataType as DataKelasType } from '@/services/api/pengguna/ruang-kelas/lihat'
import cn from '@/utils/class-names'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import {
  BsCardChecklist,
  BsClipboardPlus,
  BsFileRichtext,
  BsPlusCircle,
  BsWebcam,
} from 'react-icons/bs'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import { Popover } from 'rizzui'
import TambahBahanPopoverItem from '../pengajar/popover-item'
import KonferensiItem from './bahan-ajar-item/konferensi'
import MateriItem from './bahan-ajar-item/materi'
import TugasItem from './bahan-ajar-item/tugas'
import UjianItem from './bahan-ajar-item/ujian'
import TambahKonferensiSesiModal from './pengajar/modal/tambah-konferensi'
import TambahMateriSesiModal from './pengajar/modal/tambah-materi'
import TambahTugasSesiModal from './pengajar/modal/tambah-tugas'
import TambahUjianSesiModal from './pengajar/modal/tambah-ujian'

type BahanAjarCardProps = {
  kelas: DataKelasType
  className?: string
}

export default function BahanAjarCard({
  kelas,
  className,
}: BahanAjarCardProps) {
  const { jwt } = useSessionJwt()

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

  const { kelas: idKelas, sesi: idSesi }: { kelas: string; sesi: string } =
    useParams()

  const queryKey = [
    'pengguna.ruang-kelas.sesi-pembelajaran.bahan-ajar.list',
    idKelas,
    idSesi,
  ]

  const { data, isLoading, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey,
    queryFn: async ({ pageParam: page }) => {
      const { data } = await listAktifitasApi({
        jwt,
        page,
        idKelas,
        idSesi,
        order: 'ASC',
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
  })

  const list = data?.pages.flatMap((page) => page.list) ?? []

  const [refSentry] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage: hasNextPage,
    onLoadMore: fetchNextPage,
  })

  return (
    <>
      <Card className={cn('flex flex-col p-0', className)}>
        <div className="flex justify-between items-start gap-x-2 p-2">
          <Title as="h6" weight="semibold">
            Bahan Ajar
          </Title>
          {kelas.peran === 'Pengajar' && (
            <Popover>
              <Popover.Trigger>
                <Button size="sm" variant="text" className="min-h-0 p-0 mt-1">
                  <BsPlusCircle className="size-3 mr-1" /> Tambah bahan ajar
                </Button>
              </Popover.Trigger>
              <Popover.Content className="flex flex-col px-0 py-1">
                {({ setOpen }) => (
                  <>
                    <TambahBahanPopoverItem
                      title="Materi"
                      color="green"
                      Icon={BsFileRichtext}
                      setOpen={setOpen}
                      onClick={() => doShowTambahMateri(idSesi)}
                    />
                    <TambahBahanPopoverItem
                      title="Tugas"
                      color="violet"
                      Icon={BsClipboardPlus}
                      setOpen={setOpen}
                      onClick={() => doShowTambahTugas(idSesi)}
                    />
                    <TambahBahanPopoverItem
                      title="Ujian"
                      color="blue"
                      Icon={BsCardChecklist}
                      setOpen={setOpen}
                      onClick={() => doShowTambahUjian(idSesi)}
                    />
                    <TambahBahanPopoverItem
                      title="Konferensi"
                      color="red"
                      Icon={BsWebcam}
                      setOpen={setOpen}
                      onClick={() => doShowTambahKonferensi(idSesi)}
                    />
                  </>
                )}
              </Popover.Content>
            </Popover>
          )}
        </div>
        {isLoading ? (
          <SectionShimmer />
        ) : (
          <div className="[&>*]:border-t [&>*]:border-muted">
            {list.map(
              (item) =>
                !!item.aktifitas && (
                  <div key={item.aktifitas.id} className="hover:bg-gray-50/50">
                    {item.aktifitas.tipe === 'Materi' ? (
                      <MateriItem kelas={kelas} data={item} />
                    ) : item.aktifitas.tipe === 'Penugasan' ? (
                      <TugasItem kelas={kelas} data={item} />
                    ) : item.aktifitas.tipe === 'Konferensi' ? (
                      <KonferensiItem kelas={kelas} data={item} />
                    ) : item.aktifitas.tipe === 'Ujian' ? (
                      <UjianItem kelas={kelas} data={item} />
                    ) : null}
                  </div>
                )
            )}
            {!isLoading && hasNextPage && (
              <ContentLoader ref={refSentry} size="sm" className="py-4" />
            )}
          </div>
        )}
      </Card>

      {kelas.peran === 'Pengajar' && (
        <>
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

function SectionShimmer() {
  return (
    <div className="[&>*]:border-t [&>*]:border-muted">
      {[...Array(3)].map((_, idx) => (
        <div key={idx} className="flex flex-1 gap-x-2 px-2 py-4">
          <Shimmer className="size-[2.625rem]" />
          <div className="flex flex-col gap-y-4 flex-1">
            <Shimmer className="h-3 w-2/12" />
            <Shimmer className="h-2.5 w-3/12" />
            <Shimmer className="h-2.5 w-2/12" />
          </div>
        </div>
      ))}
    </div>
  )
}
