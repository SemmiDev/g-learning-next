import { hapusAktifitasAction } from '@/actions/pengguna/ruang-kelas/aktifitas/hapus'
import { DataType } from '@/actions/pengguna/ruang-kelas/aktifitas/list'
import { DataType as DataKelasType } from '@/actions/pengguna/ruang-kelas/lihat'
import {
  Button,
  Card,
  CardSeparator,
  FileListItem,
  FilePreviewType,
  Komentar,
  ModalConfirm,
  ModalFilePreview,
  Text,
  TextSpan,
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
import { stripHtmlAndEllipsis } from '@/utils/text'
import { useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import DropdownMoreAction from '../dropdown-more-action'
import UbahTugasModal from '../modal/ubah-tugas'
import { passedTime } from '@/utils/time'

type TugasCardProps = {
  kelas: DataKelasType | undefined
  data: DataType
  className?: string
}

export default function TugasCard({ kelas, data, className }: TugasCardProps) {
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
          {!!data.file_aktifitas && data.file_aktifitas.length > 0 && (
            <div className="flex flex-col gap-y-2 mt-4">
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
                      image: file.type === 'image',
                    })
                  }}
                  download
                />
              ))}
            </div>
          )}
          {data.aktifitas.batas_waktu && (
            <Text weight="semibold" variant="dark" className="mt-4">
              Batas Waktu Pengumpulan:{' '}
              <TextSpan
                variant="dark"
                color={
                  passedTime(data.aktifitas.batas_waktu) ? 'danger' : 'gray'
                }
              >
                <Time date={data.aktifitas.batas_waktu} format="datetime" />
              </TextSpan>
            </Text>
          )}
        </div>
        <CardSeparator />
        <div className="p-2">
          <Link
            href={`${routes.pengguna.ruangKelas[jenisKelas][tipeKelas]}/${idKelas}/diskusi/tugas/${data.aktifitas.id}`}
          >
            <Button as="span" size="sm" className="w-full">
              {kelas?.peran === 'Pengajar' ? 'Cek Tugas' : 'Kumpulkan Tugas'}
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

      <UbahTugasModal show={showUbah} id={keyUbah} onHide={doHideUbah} />

      <ModalFilePreview
        file={filePreview}
        onClose={() => setFilePreview(undefined)}
      />

      <ModalConfirm
        title="Hapus Tugas"
        desc="Apakah Anda yakin ingin menghapus tugas ini?"
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
