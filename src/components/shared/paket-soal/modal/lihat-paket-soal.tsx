import {
  CardSeparator,
  Loader,
  Modal,
  ModalFooterButtons,
} from '@/components/ui'
import { SanitizeHTML } from '@/components/ui/sanitize-html'
import { useSessionJwt } from '@/hooks/use-session-jwt'
import { lihatPaketSoalApi } from '@/services/api/shared/paket-soal/lihat'
import cn from '@/utils/class-names'
import { makeSimpleQueryData } from '@/utils/query-data'
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
  const { jwt } = useSessionJwt()

  const { id: idKategori }: { id: string } = useParams()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['shared.paket-soal.lihat', idKategori, id],
    queryFn: makeSimpleQueryData(
      lihatPaketSoalApi,
      jwt,
      idKategori,
      id ?? null
    ),
  })

  return (
    <Modal
      title="Detail Paket Soal"
      size="lg"
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
              <DataRow label="Nama Paket Soal">{data?.judul || '-'}</DataRow>
              <DataRow label="Jumlah Soal Digunakan">
                {data?.jumlah_soal_yang_digunakan || '-'}
              </DataRow>
              <DataRow label="Bobot Soal Pilihan Ganda">
                <table>
                  <tr>
                    <td>Benar</td>
                    <td> : </td>
                    <td>{data?.bobot_benar || '0'}</td>
                  </tr>
                  <tr>
                    <td>Salah</td>
                    <td> : </td>
                    <td>{data?.bobot_salah || '0'}</td>
                  </tr>
                  <tr>
                    <td>Kosong</td>
                    <td> : </td>
                    <td>{data?.bobot_kosong || '0'}</td>
                  </tr>
                </table>
              </DataRow>
              <DataRow label="Bobot Total Soal Pilihan Ganda">
                {data?.persentase_pilihan_ganda || '0'}%
              </DataRow>
              <DataRow label="Bobot Total Soal Esai">
                {data?.persentase_essay || '0'}%
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
      <td className="max-w-16 font-medium text-gray-lighter align-baseline text-right pe-5 py-2">
        {label}
      </td>
      <td className={cn('font-semibold text-gray-dark py-2', className)}>
        {children}
      </td>
    </tr>
  )
}
