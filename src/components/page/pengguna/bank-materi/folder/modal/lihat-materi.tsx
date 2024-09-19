import { lihatBankMateriAction } from '@/actions/pengguna/bank-materi/lihat'
import {
  CardSeparator,
  FileListItem,
  Loader,
  Modal,
  ModalDocumentPreview,
  ModalFooterButtons,
  PustakaMediaFileType,
} from '@/components/ui'
import { SanitizeHTML } from '@/components/ui/sanitize-html'
import cn from '@/utils/class-names'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { ReactNode, useState } from 'react'

type LihatMateriModalProps = {
  id?: string
  setId(id?: string): void
}

export default function LihatMateriModal({ id, setId }: LihatMateriModalProps) {
  const [urlPreview, setUrlPreview] = useState<string>()

  const { id: idKategori }: { id: string } = useParams()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['pengguna.bank-materi.lihat', idKategori, id],
    queryFn: async () => {
      if (!id) return null

      const { data } = await lihatBankMateriAction(idKategori, id)

      return data
    },
  })

  const files: PustakaMediaFileType[] = (data?.daftar_file_bank_ajar ?? []).map(
    (file) => ({
      id: file.id,
      name: file.nama,
      time: file.created_at,
      link: file.url,
      extension: file.ekstensi,
      size: file.ukuran,
      folder: false,
      type:
        file.tipe === 'Audio'
          ? 'audio'
          : file.tipe === 'Video'
          ? 'video'
          : file.tipe === 'Gambar'
          ? 'image'
          : file.tipe === 'Teks'
          ? 'link'
          : undefined,
      driveId: file.id_instansi ?? undefined,
    })
  )

  return (
    <Modal
      title="Detail Bank Materi"
      isLoading={!isLoading && isFetching}
      isOpen={!!id}
      onClose={() => setId(undefined)}
    >
      {isLoading || !id ? (
        <Loader height={410} />
      ) : (
        <>
          <table className="mx-3">
            <tbody>
              <DataRow label="Tipe">{data?.bank_ajar.tipe || '-'}</DataRow>
              <DataRow label="Judul">{data?.bank_ajar.judul || '-'}</DataRow>
              <DataRow label="Catatan" className="font-medium">
                <SanitizeHTML html={data?.bank_ajar.deskripsi || '-'} />
              </DataRow>
              <DataRow label="Berkas">
                <div className="flex flex-col gap-1">
                  {files.map((file) => (
                    <FileListItem
                      key={file.id}
                      file={file}
                      onPreview={(file) => setUrlPreview(file.link)}
                      download
                    />
                  ))}
                </div>
              </DataRow>
            </tbody>
          </table>
        </>
      )}

      <ModalDocumentPreview
        openUrl={urlPreview}
        onClose={() => setUrlPreview(undefined)}
      />

      <CardSeparator />

      <ModalFooterButtons cancel="Tutup" onCancel={() => setId(undefined)} />
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
      <td className="font-medium text-gray-lighter align-baseline text-right pe-5 py-2">
        {label}
      </td>
      <td className={cn('font-semibold text-gray-dark py-2', className)}>
        {children}
      </td>
    </tr>
  )
}
