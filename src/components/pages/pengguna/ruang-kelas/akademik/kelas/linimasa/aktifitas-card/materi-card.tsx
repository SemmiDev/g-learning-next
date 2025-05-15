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
  Thumbnail,
  Time,
  Title,
} from '@/components/ui'
import ModalInfo from '@/components/ui/modal/info'
import { routes } from '@/config/routes'
import { useSessionJwt } from '@/hooks/use-session-jwt'
import { useSessionPengguna } from '@/hooks/use-session-pengguna'
import { useShowModal } from '@/hooks/use-show-modal'
import { hapusAktifitasApi } from '@/services/api/pengguna/ruang-kelas/aktifitas/hapus'
import { DataType } from '@/services/api/pengguna/ruang-kelas/aktifitas/list'
import { DataType as DataKelasType } from '@/services/api/pengguna/ruang-kelas/lihat'
import { handleActionWithToast } from '@/utils/action'
import cn from '@/utils/class-names'
import { getFileType } from '@/utils/file-properties-from-api'
import { stripHtmlAndEllipsis } from '@/utils/text'
import { useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useMemo, useState } from 'react'
import DropdownMoreAction from '../dropdown-more-action'
import UbahMateriModal from '../modal/ubah-materi'

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
  const { jwt } = useSessionJwt()
  const queryClient = useQueryClient()

  const {
    show: showUbah,
    key: keyUbah,
    doShow: doShowUbah,
    doHide: doHideUbah,
  } = useShowModal<string>()
  const [idHapus, setIdHapus] = useState<string>()
  const [infoMobile, setInfoMobile] = useState<boolean>(false)
  const [filePreview, setFilePreview] = useState<FilePreviewType>()

  const { id: idPengguna } = useSessionPengguna()
  const { kelas: idKelas }: { kelas: string } = useParams()

  const imageFile = useMemo(
    () => (data.file_aktifitas ?? []).find((item) => item.tipe === 'Gambar'),
    [data.file_aktifitas]
  )

  const isPengajar = useMemo(() => kelas?.peran === 'Pengajar', [kelas])
  const isPeserta = useMemo(() => kelas?.peran === 'Peserta', [kelas])

  const absenTanpaInteraksi = useMemo(
    () => ['Manual', 'Otomatis'].includes(data?.aktifitas?.absen || ''),
    [data]
  )
  const absenDenganInteraksi = useMemo(
    () =>
      ['GPS', 'GPS dan Swafoto', 'QR Code'].includes(
        data?.aktifitas?.absen || ''
      ),
    [data]
  )

  const showFull = isPengajar || (isPeserta && absenTanpaInteraksi)

  const handleHapus = () => {
    if (!idHapus) return

    handleActionWithToast(hapusAktifitasApi(jwt, idKelas, idHapus), {
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
          {showFull && (
            <>
              <Text size="sm" variant="dark" className="truncate">
                {stripHtmlAndEllipsis(data.aktifitas.deskripsi ?? '', 100)}
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
            </>
          )}
        </div>
        <CardSeparator />
        <div className="p-2">
          {isPeserta && absenDenganInteraksi ? (
            <Button
              size="sm"
              className="w-full"
              onClick={() => setInfoMobile(true)}
            >
              {kelas?.peran === 'Pengajar' ? 'Buka Kelas' : 'Masuk Kelas'}
            </Button>
          ) : (
            <Link
              href={`${routes.pengguna.ruangKelas[jenisKelas][tipeKelas]}/${idKelas}/linimasa/materi/${data.aktifitas.id}`}
            >
              <Button as="span" size="sm" className="w-full">
                Lihat Detail Materi
              </Button>
            </Link>
          )}
          <Komentar
            idKelas={idKelas}
            idAktifitas={data.aktifitas.id}
            total={data.total_komentar}
            invalidateQueries={[
              ['pengguna.ruang-kelas.linimasa.list', idKelas],
            ]}
            className="pt-4 px-4 pb-2"
          />
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

      <ModalInfo
        title="Tidak dapat membuka materi ini"
        desc="Agar bisa membuka materi, lakukan presensi dengan membuka halaman ini melalui smartphone kamu"
        color="danger"
        headerIcon="warning"
        isOpen={infoMobile}
        close="Oke"
        onClose={() => setInfoMobile(false)}
      />
    </>
  )
}
