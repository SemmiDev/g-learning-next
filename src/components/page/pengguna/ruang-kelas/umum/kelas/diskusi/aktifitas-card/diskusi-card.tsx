import { hapusAktifitasAction } from '@/actions/pengguna/ruang-kelas/aktifitas/hapus'
import { DataType } from '@/actions/pengguna/ruang-kelas/aktifitas/list'
import { DataType as DataKelasType } from '@/actions/pengguna/ruang-kelas/lihat'
import {
  Button,
  Card,
  CardSeparator,
  FilePreviewType,
  Komentar,
  ModalConfirm,
  ModalFilePreview,
  Text,
  Thumbnail,
  Time,
  Title,
} from '@/components/ui'
import { routes } from '@/config/routes'
import { useSessionPengguna } from '@/hooks/use-session-pengguna'
import { handleActionWithToast } from '@/utils/action'
import cn from '@/utils/class-names'
import { stripHtmlAndEllipsis } from '@/utils/text'
import { useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import DropdownMoreAction from '../dropdown-more-action'

type DiskusiCardProps = {
  kelas: DataKelasType | undefined
  data: DataType
  className?: string
}

export default function DiskusiCard({
  kelas,
  data,
  className,
}: DiskusiCardProps) {
  const queryClient = useQueryClient()
  const [idHapus, setIdHapus] = useState<string>()
  const [filePreview, setFilePreview] = useState<FilePreviewType>()

  const { id: idPengguna } = useSessionPengguna()
  const { kelas: idKelas }: { kelas: string } = useParams()

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

  const jenisKelas = kelas?.peran === 'Pengajar' ? 'dikelola' : 'diikuti'
  const tipeKelas = kelas?.kelas.tipe === 'Akademik' ? 'akademik' : 'umum'

  if (!data.aktifitas) return null

  return (
    <>
      <Card className={cn('flex flex-col px-0 py-0', className)}>
        <div className="flex justify-between items-start px-4 py-2">
          <div className="flex items-center gap-x-3">
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
            href={`${routes.pengguna.ruangKelas[jenisKelas][tipeKelas]}/${idKelas}/diskusi/lainnya/${data.aktifitas.id}`}
          >
            <Button as="span" size="sm" className="w-full">
              Lihat Diskusi
            </Button>
          </Link>
          <Komentar
            idKelas={idKelas}
            idAktifitas={data.aktifitas.id}
            total={data.total_komentar}
            invalidateQueries={[['pengguna.ruang-kelas.diskusi.list', idKelas]]}
            className="pt-4 px-2 pb-2"
          />
        </div>
      </Card>

      <ModalFilePreview
        file={filePreview}
        onClose={() => setFilePreview(undefined)}
      />

      <ModalConfirm
        title="Hapus Diskusi"
        desc="Apakah Anda yakin ingin menghapus diskusi ini?"
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
