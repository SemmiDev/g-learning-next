import { DataType as DataPresensiType } from '@/actions/pengguna/ruang-kelas/aktifitas/sesi/table-presensi-peserta'
import {
  CardSeparator,
  FilePreviewType,
  Modal,
  ModalFilePreview,
  ModalFooterButtons,
  TextBordered,
  TextSpan,
  Thumbnail,
} from '@/components/ui'
import { thumbnailFileUrl } from '@/utils/file-url'
import dynamic from 'next/dynamic'
import { ReactNode, useState } from 'react'
import 'leaflet/dist/leaflet.css'

const Map = dynamic(() => import('@/components/ui/map'), { ssr: false })

type DetailPresensiModalProps = {
  data: DataPresensiType | undefined
  show: boolean
  onHide: () => void
}

export default function DetailPresensiModal({
  data,
  show,
  onHide,
}: DetailPresensiModalProps) {
  const [previewFile, setPreviewFile] = useState<FilePreviewType>()

  return (
    <>
      <Modal
        title="Detail Presensi Peserta"
        size="lg"
        isOpen={show}
        onClose={onHide}
      >
        <div className="flex flex-col gap-4 p-3">
          <DataRow label="Nama Lengkap" outline>
            {data?.nama || '-'}
          </DataRow>
          <DataRow label="Status" outline>
            {data?.status || '-'}
          </DataRow>
          {!!data?.latitude && !!data?.longitude && (
            <DataRow label="Posisi Presensi">
              <Map height={250} latLong={[data.latitude, data.longitude]} />
            </DataRow>
          )}
          {!!data?.swafoto_url && (
            <DataRow label="Swafoto Presensi">
              <Thumbnail
                src={thumbnailFileUrl(data?.swafoto_url || undefined)}
                alt="Swafoto"
                size={128}
                resize={128}
                rounded="md"
                className="cursor-pointer"
                onClick={() =>
                  setPreviewFile({
                    url: data?.swafoto_url || '',
                  })
                }
              />
            </DataRow>
          )}
        </div>

        <CardSeparator />

        <ModalFooterButtons cancel="Tutup" onCancel={onHide} />
      </Modal>

      <ModalFilePreview
        file={previewFile}
        onClose={() => setPreviewFile(undefined)}
      />
    </>
  )
}

function DataRow({
  label,
  children,
  outline,
  outlineClassName,
}: {
  label: string
  children?: ReactNode
  outline?: boolean
  outlineClassName?: string
}) {
  return (
    <div className="grid grid-cols-12 items-center gap-y-1 gap-x-2">
      <div className="col-span-12 sm:col-span-3 lg:col-span-3">
        <TextSpan weight="semibold">{label}</TextSpan>
      </div>
      <div className="col-span-12 sm:col-span-9 lg:col-span-9">
        {outline ? (
          <TextBordered className={outlineClassName}>{children}</TextBordered>
        ) : (
          children
        )}
      </div>
    </div>
  )
}
