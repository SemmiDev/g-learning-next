import { lihatBankMateriAction } from '@/actions/pengguna/bank-materi/lihat'
import {
  CardSeparator,
  FileListItem,
  FilePreviewType,
  Loader,
  Modal,
  ModalFilePreview,
  ModalFooterButtons,
  PustakaMediaFileType,
} from '@/components/ui'
import { SanitizeHTML } from '@/components/ui/sanitize-html'
import cn from '@/utils/class-names'
import { getFileType } from '@/utils/file-properties-from-api'
import { makeSimpleQueryDataWithParams } from '@/utils/query-data'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { ReactNode, useState } from 'react'

type LihatMateriModalProps = {
  id: string | undefined
  show: boolean
  onHide: () => void
}

export default function LihatMateriModal({
  id,
  show,
  onHide,
}: LihatMateriModalProps) {
  const [filePreview, setFilePreview] = useState<FilePreviewType>()

  const { id: idKategori }: { id: string } = useParams()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['pengguna.bank-materi.lihat', idKategori, id],
    queryFn: makeSimpleQueryDataWithParams(
      lihatBankMateriAction,
      idKategori,
      id ?? null
    ),
  })

  const files: PustakaMediaFileType[] = (data?.daftar_file_bank_ajar ?? []).map(
    (item) => ({
      id: item.id,
      name: item.nama,
      time: item.created_at,
      link: item.url,
      extension: item.ekstensi,
      size: item.ukuran,
      folder: false,
      type: getFileType(item),
      driveId: item.google_drive
        ? 'GOOGLE_DRIVE'
        : item.id_instansi ?? 'PERSONAL',
    })
  )

  return (
    <Modal
      title="Detail Bank Materi"
      isLoading={!isLoading && isFetching}
      isOpen={show}
      onClose={onHide}
    >
      {isLoading ? (
        <Loader height={330} />
      ) : (
        <>
          <table className="w-[calc(100%-1.5rem)] mx-3">
            <tbody>
              <DataRow label="Tipe">
                {data?.bank_ajar.tipe
                  ? data?.bank_ajar.tipe === 'Materi'
                    ? 'Materi'
                    : 'Tugas'
                  : '-'}
              </DataRow>
              <DataRow label="Judul">{data?.bank_ajar.judul || '-'}</DataRow>
              <DataRow label="Catatan" className="font-medium">
                <SanitizeHTML html={data?.bank_ajar.deskripsi || '-'} />
              </DataRow>
              <DataRow label="Berkas">
                <div className="flex flex-col space-y-2">
                  {files.length > 0
                    ? files.map((file) => (
                        <FileListItem
                          key={file.id}
                          file={file}
                          onPreview={(file) => {
                            if (!file.link) return

                            setFilePreview({
                              url: file.link,
                              extension: file.extension,
                            })
                          }}
                          download
                        />
                      ))
                    : '-'}
                </div>
              </DataRow>
            </tbody>
          </table>
        </>
      )}

      <ModalFilePreview
        file={filePreview}
        onClose={() => setFilePreview(undefined)}
      />

      <CardSeparator />

      <ModalFooterButtons cancel="Tutup" onCancel={onHide} />
    </Modal>
  )
}

function DataRow({
  label,
  children,
  className,
}: {
  label: string
  children?: ReactNode
  className?: string
}) {
  return (
    <tr>
      <td className="w-0 font-medium text-gray-lighter align-baseline text-right pe-5 py-2">
        {label}
      </td>
      <td className={cn('font-semibold text-gray-dark py-2', className)}>
        {children}
      </td>
    </tr>
  )
}
