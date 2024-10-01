import { DataType } from '@/actions/pengguna/ruang-kelas/aktifitas/list'
import {
  Button,
  Card,
  CardSeparator,
  FileListItem,
  ModalConfirm,
  Text,
  Time,
  Title,
} from '@/components/ui'
import { routes } from '@/config/routes'
import cn from '@/utils/class-names'
import imagePhoto from '@public/images/photo.png'
import imagePreview from '@public/images/preview-video.png'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import DropdownMoreAction from './dropdown-more-action'
import { useState } from 'react'
import { handleActionWithToast } from '@/utils/action'
import { useQueryClient } from '@tanstack/react-query'
import { hapusAktifitasAction } from '@/actions/pengguna/ruang-kelas/aktifitas/hapus'
import { stripHtml } from '@/utils/text'

type MateriCardProps = {
  data: DataType
  className?: string
}

export default function MateriCard({ data, className }: MateriCardProps) {
  const queryClient = useQueryClient()
  const [idHapus, setIdHapus] = useState<string>()

  const { kelas: idKelas }: { kelas: string } = useParams()

  const strippedDesc = stripHtml(data.aktifitas.deskripsi ?? '')
  const imageFile = (data.file_aktifitas ?? []).find(
    (item) => item.tipe === 'Gambar'
  )

  const handleHapus = () => {
    if (!idHapus) return

    handleActionWithToast(hapusAktifitasAction(idKelas, idHapus), {
      loading: 'Menghapus...',
      onSuccess: () => {
        setIdHapus(undefined)

        queryClient.invalidateQueries({
          queryKey: ['pengguna.ruang-kelas.diskusi.list'],
        })
      },
    })
  }

  return (
    <>
      <Card className={cn('flex flex-col px-0 py-0', className)}>
        <div className="flex justify-between items-start px-4 py-2">
          <div className="flex space-x-3">
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
          {/* TODO: aksi onEdit dan onDelete tergantung role */}
          <DropdownMoreAction
            onDelete={() => setIdHapus(data.aktifitas.id)}
            showDelete
            showEdit
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
          {imageFile && (
            <div className="flex justify-center mt-4">
              <div className="flex max-w-8/12 max-h-60">
                <Image
                  src={imageFile.url}
                  alt="preview"
                  width={640}
                  height={640}
                  className="object-contain"
                />
              </div>
            </div>
          )}
          <div className="mt-4">
            {data.file_aktifitas.map((file) => (
              <FileListItem
                key={file.id}
                file={{
                  id: file.id,
                  name: file.nama,
                  folder: false,
                  size: file.ukuran,
                  time: file.created_at,
                }}
                download
              />
            ))}
          </div>
        </div>
        <CardSeparator />
        <div className="p-2">
          <Link
            href={`${routes.pengguna.ruangKelas}/${idKelas}/diskusi/detail`}
          >
            <Button size="sm" className="w-full">
              Buka Kelas
            </Button>
          </Link>
        </div>
      </Card>

      <ModalConfirm
        title="Hapus Aktifitas"
        desc="Apakah Anda yakin ingin menghapus aktifitas ini?"
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
