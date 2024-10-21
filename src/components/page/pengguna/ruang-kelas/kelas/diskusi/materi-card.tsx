import { hapusAktifitasAction } from '@/actions/pengguna/ruang-kelas/aktifitas/hapus'
import { DataType } from '@/actions/pengguna/ruang-kelas/aktifitas/list'
import { DataType as DataKelasType } from '@/actions/pengguna/ruang-kelas/lihat'
import {
  Button,
  Card,
  CardSeparator,
  FileListItem,
  FilePreviewType,
  ModalConfirm,
  ModalFilePreview,
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
import { getFileType } from '@/utils/file-properties-from-api'
import { stripHtml } from '@/utils/text'
import { useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import DropdownMoreAction from './dropdown-more-action'
import UbahMateriModal from './modal/ubah-materi'

type MateriCardProps = {
  kelas: DataKelasType | undefined
  data: DataType
  className?: string
}

export default function MateriCard({
  kelas,
  data,
  className,
}: MateriCardProps) {
  const queryClient = useQueryClient()
  const {
    show: showUbah,
    key: keyUbah,
    doShow: doShowUbah,
    doHide: doHideUbah,
  } = useShowModal<string>()
  const [idHapus, setIdHapus] = useState<string>()
  const [filePreview, setFilePreview] = useState<FilePreviewType>()

  const { id: idPengguna } = useSessionPengguna()
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
          queryKey: ['pengguna.ruang-kelas?.diskusi.list', idKelas],
        })
      },
    })
  }

  return (
    <>
      <Card className={cn('flex flex-col px-0 py-0', className)}>
        <div className="flex justify-between items-start px-4 py-2">
          <div className="flex items-center space-x-3">
            <Thumbnail
              src={data.pembuat.foto}
              alt="profil"
              size={48}
              rounded="lg"
              avatar={data.pembuat.nama}
            />
            <div className="flex flex-col">
              <Text weight="semibold" variant="dark">
                {data.pembuat.nama}
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
          {data.file_aktifitas.length > 0 && (
            <div className="flex flex-col space-y-2 mt-4">
              {data.file_aktifitas.map((file) => (
                <FileListItem
                  key={file.id}
                  file={{
                    id: file.id,
                    name: file.nama,
                    folder: false,
                    extension: file.ekstensi,
                    size: file.ukuran,
                    time: file.created_at,
                    type: getFileType(file),
                    link: file.url,
                  }}
                  onPreview={(file) => {
                    if (!file.link) return

                    setFilePreview({
                      url: file.link,
                      extension: file.extension,
                    })
                  }}
                  download
                />
              ))}
            </div>
          )}
        </div>
        <CardSeparator />
        <div className="p-2">
          <Link
            href={`${routes.pengguna.ruangKelas}/${idKelas}/diskusi/materi/${data.aktifitas.id}`}
          >
            <Button as="span" size="sm" className="w-full">
              {kelas?.peran === 'Pengajar' ? 'Buka Kelas' : 'Masuk Kelas'}
            </Button>
          </Link>
        </div>
      </Card>

      <UbahMateriModal show={showUbah} id={keyUbah} onHide={doHideUbah} />

      <ModalFilePreview
        file={filePreview}
        onClose={() => setFilePreview(undefined)}
      />

      <ModalConfirm
        title="Hapus Materi"
        desc="Apakah Anda yakin ingin menghapus materi ini?"
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
