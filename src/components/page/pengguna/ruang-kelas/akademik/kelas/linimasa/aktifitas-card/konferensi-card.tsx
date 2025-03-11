import { hapusAktifitasAction } from '@/actions/pengguna/ruang-kelas/aktifitas/hapus'
import { DataType } from '@/actions/pengguna/ruang-kelas/aktifitas/list'
import { DataType as DataKelasType } from '@/actions/pengguna/ruang-kelas/lihat'
import {
  Button,
  Card,
  CardSeparator,
  Komentar,
  ModalConfirm,
  Text,
  Thumbnail,
  Time,
  Title,
} from '@/components/ui'
import { routes } from '@/config/routes'
import { useSessionPengguna } from '@/hooks/use-session-pengguna'
import { useShowModal } from '@/hooks/use-show-modal'
import { handleActionWithToast } from '@/utils/action'
import cn from '@/utils/class-names'
import { stripHtmlAndEllipsis } from '@/utils/text'
import { useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { BsCameraVideo } from 'react-icons/bs'
import DropdownMoreAction from '../dropdown-more-action'
import UbahKonferensiModal from '../modal/ubah-konferensi'

type KonferensiCardProps = {
  kelas: DataKelasType | undefined
  data: DataType
  className?: string
}

export default function KonferensiCard({
  kelas,
  data,
  className,
}: KonferensiCardProps) {
  const queryClient = useQueryClient()
  const {
    show: showUbah,
    key: keyUbah,
    doShow: doShowUbah,
    doHide: doHideUbah,
  } = useShowModal<string>()
  const [idHapus, setIdHapus] = useState<string>()

  const { id: idPengguna } = useSessionPengguna()
  const { kelas: idKelas }: { kelas: string } = useParams()

  const handleHapus = () => {
    if (!idHapus) return

    handleActionWithToast(hapusAktifitasAction(idKelas, idHapus), {
      loading: 'Menghapus...',
      onSuccess: () => {
        setIdHapus(undefined)

        queryClient.invalidateQueries({
          queryKey: ['pengguna.ruang-kelas.linimasa.list', idKelas],
        })
      },
    })
  }

  const jenisKelas = kelas?.peran === 'Pengajar' ? 'dikelola' : 'diikuti'
  const tipeKelas = kelas?.kelas.tipe === 'Akademik' ? 'akademik' : 'umum'

  if (!data.aktifitas) return null

  return (
    <>
      <Card className={cn('flex flex-col px-0 py-0', className)}>
        <div className="flex justify-between items-start px-4 py-2">
          <div className="flex items-center space-x-3">
            <Thumbnail
              src={data.pembuat?.foto}
              alt="profil"
              size={48}
              rounded="lg"
              avatar={data.pembuat?.nama}
            />
            <div className="flex flex-col">
              <Text weight="semibold" variant="dark">
                {data.pembuat?.nama}
              </Text>
              <Text size="xs" weight="medium" variant="lighter">
                <Time date={data.aktifitas.created_at} fromNow />
              </Text>
            </div>
          </div>
          <DropdownMoreAction
            onEdit={() => doShowUbah(data.aktifitas?.id || '')}
            showEdit={data.aktifitas.id_pembuat === idPengguna}
            onDelete={() => setIdHapus(data.aktifitas?.id)}
            showDelete={
              data.aktifitas.id_pembuat === idPengguna ||
              kelas?.peran === 'Pengajar'
            }
          />
        </div>
        <CardSeparator />
        <div className="flex flex-col px-4 py-2">
          <Title as="h4" size="1.5xl" weight="semibold" className="mb-1">
            {data.aktifitas.judul}
          </Title>
          <Text size="sm" variant="dark" className="truncate">
            {stripHtmlAndEllipsis(data.aktifitas.deskripsi ?? '', 100)}
          </Text>
        </div>
        <CardSeparator />
        <div className="p-2">
          <Link
            href={`${routes.pengguna.ruangKelas[jenisKelas][tipeKelas]}/${idKelas}/linimasa/konferensi/${data.aktifitas.id}`}
          >
            <Button as="span" size="sm" color="primary" className="w-full">
              <BsCameraVideo size={16} className="me-2" /> Lihat Detail
              Konferensi
            </Button>
          </Link>
          <Komentar
            idKelas={idKelas}
            idAktifitas={data.aktifitas.id}
            total={data.total_komentar}
            invalidateQueries={[
              ['pengguna.ruang-kelas.linimasa.list', idKelas],
            ]}
            className="pt-4 px-2 pb-2"
          />
        </div>
      </Card>

      <UbahKonferensiModal show={showUbah} id={keyUbah} onHide={doHideUbah} />

      <ModalConfirm
        title="Hapus Konferensi"
        desc="Apakah Anda yakin ingin menghapus konferensi ini?"
        color="danger"
        isOpen={!!idHapus}
        onClose={() => setIdHapus(undefined)}
        onConfirm={handleHapus}
        headerIcon="help"
        closeOnCancel
      />
    </>
  )
}
