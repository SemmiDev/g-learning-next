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
  Time,
  Title,
} from '@/components/ui'
import { routes } from '@/config/routes'
import { useSessionPengguna } from '@/hooks/use-session-pengguna'
import { useShowModal } from '@/hooks/use-show-modal'
import { handleActionWithToast } from '@/utils/action'
import cn from '@/utils/class-names'
import { stripHtml } from '@/utils/text'
import imagePhoto from '@public/images/photo.png'
import { useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { BsCameraVideo } from 'react-icons/bs'
import DropdownMoreAction from './dropdown-more-action'

type ConferenceCardProps = {
  kelas: DataKelasType
  data: DataType
  className?: string
}

export default function ConferenceCard({
  kelas,
  data,
  className,
}: ConferenceCardProps) {
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

  const strippedDesc = stripHtml(data.aktifitas.deskripsi ?? '')

  const handleHapus = () => {
    if (!idHapus) return

    handleActionWithToast(hapusAktifitasAction(idKelas, idHapus), {
      loading: 'Menghapus...',
      onSuccess: () => {
        setIdHapus(undefined)

        queryClient.invalidateQueries({
          queryKey: ['pengguna.ruang-kelas.diskusi.list', idKelas],
        })
      },
    })
  }

  return (
    <>
      <Card className={cn('flex flex-col px-0 py-0', className)}>
        <div className="flex justify-between items-start px-4 py-2">
          <div className="flex space-x-3">
            {/* TODO: Foto Pengguna */}
            <Image src={imagePhoto} alt="foto" className="size-12 rounded-lg" />
            <div className="flex flex-col">
              <Text weight="semibold" variant="dark">
                {/* TODO: Pengguna */}
                Prabroro Janggar
              </Text>
              <Text size="xs" weight="medium" variant="lighter">
                <Time date={data.aktifitas.created_at} fromNow />
              </Text>
            </div>
          </div>
          <DropdownMoreAction
            onEdit={() => doShowUbah(data.aktifitas.id)}
            showEdit={data.aktifitas.id_pembuat === idPengguna}
            onDelete={() => setIdHapus(data.aktifitas.id)}
            showDelete={
              data.aktifitas.id_pembuat === idPengguna ||
              kelas.peran === 'Pengajar'
            }
          />
        </div>
        <CardSeparator />
        <div className="flex flex-col px-4 py-2">
          <Title as="h4" size="1.5xl" weight="semibold" className="mb-1">
            {data.aktifitas.judul}
          </Title>
          <Text size="sm" variant="dark" className="truncate">
            {strippedDesc.slice(0, 100)}
            {strippedDesc.length > 100 && '...'}
          </Text>
        </div>
        <CardSeparator />
        <div className="p-2">
          <Link
            href={`${routes.pengguna.ruangKelas}/${idKelas}/diskusi/conference/${data.aktifitas.id}`}
          >
            <Button as="span" size="sm" color="primary" className="w-full">
              <BsCameraVideo size={16} className="me-2" />{' '}
              {kelas.peran === 'Pengajar' ? 'Buka Kelas' : 'Masuk Kelas'}
            </Button>
          </Link>
          <Komentar
            idKelas={idKelas}
            idAktifitas={data.aktifitas.id}
            className="pt-4 px-2 pb-2"
          />
        </div>
      </Card>

      <ModalConfirm
        title="Hapus Conference"
        desc="Apakah Anda yakin ingin menghapus conference ini?"
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
