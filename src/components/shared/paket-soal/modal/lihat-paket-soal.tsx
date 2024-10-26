import { lihatPaketSoalAction } from '@/actions/shared/paket-soal/lihat'
import {
  CardSeparator,
  Loader,
  Modal,
  ModalFooterButtons,
} from '@/components/ui'
import { SanitizeHTML } from '@/components/ui/sanitize-html'
import cn from '@/utils/class-names'
import { makeSimpleQueryDataWithParams } from '@/utils/query-data'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { ReactNode } from 'react'

type LihatSoalModalProps = {
  id: string | undefined
  show: boolean
  onHide: () => void
}

export default function LihatSoalModal({
  id,
  show,
  onHide,
}: LihatSoalModalProps) {
  const { id: idKategori }: { id: string } = useParams()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['shared.paket-soal.lihat', idKategori, id],
    queryFn: makeSimpleQueryDataWithParams(
      lihatPaketSoalAction,
      idKategori,
      id ?? null
    ),
  })

  return (
    <Modal
      title="Detail Paket Soal"
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
              <DataRow label="Judul Soal">{data?.judul || '-'}</DataRow>
              <DataRow label="Jumlah Soal Digunakan">
                {data?.jumlah_soal_yang_digunakan || '-'}
              </DataRow>
              <DataRow label="Bobot Benar">{data?.bobot_benar || '-'}</DataRow>
              <DataRow label="Bobot Salah">{data?.bobot_salah || '-'}</DataRow>
              <DataRow label="Bobot Kosong">
                {data?.bobot_kosong || '-'}
              </DataRow>
              <DataRow label="Deskripsi" className="font-medium">
                <SanitizeHTML html={data?.deskripsi || '-'} />
              </DataRow>
            </tbody>
          </table>
        </>
      )}

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
      <td className="max-w-28 font-medium text-gray-lighter align-baseline text-right pe-5 py-2">
        {label}
      </td>
      <td className={cn('font-semibold text-gray-dark py-2', className)}>
        {children}
      </td>
    </tr>
  )
}
