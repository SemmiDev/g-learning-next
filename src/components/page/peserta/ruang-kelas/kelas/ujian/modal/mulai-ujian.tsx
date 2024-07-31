import { UjianItemType } from '@/app/(hydrogen)/peserta/ruang-kelas/kelas/ujian/page'
import {
  Button,
  CardSeparator,
  Modal,
  ModalFooterButtons,
  Text,
} from '@/components/ui'
import { routes } from '@/config/routes'
import cn from '@/utils/class-names'
import Link from 'next/link'

type MulaiUjianModalProps = {
  showModal?: boolean
  setShowModal(show: boolean): void
  ujian?: UjianItemType
}

export default function HasilUjianModal({
  showModal = false,
  setShowModal,
  ujian,
}: MulaiUjianModalProps) {
  return (
    <Modal
      title="Hasil Ujian"
      size="md"
      isOpen={showModal}
      headerClassName="[&_.modal-title]:text-lg"
      onClose={() => setShowModal(false)}
    >
      <div className="flex p-3">
        <table className="flex-1 text-xs text-gray-dark">
          <tbody>
            <tr>
              <td className="w-32">Jumlah pertanyaan</td>
              <td className="w-3 text-center"> : </td>
              <td className="font-semibold">20</td>
            </tr>
            <tr>
              <td>Benar/ salah</td>
              <td className="text-center"> : </td>
              <td className="font-semibold">
                {ujian?.status === 'Sudah'
                  ? '20/0'
                  : ujian?.status === 'Ulang'
                  ? '8/12'
                  : '-'}
              </td>
            </tr>
            <tr>
              <td>Waktu mulai</td>
              <td className="text-center"> : </td>
              <td className="font-semibold">
                {ujian?.status !== 'Belum' ? '18 Januari 2024 | 15:00:53' : '-'}
              </td>
            </tr>
            <tr>
              <td>Waktu selesai</td>
              <td className="text-center"> : </td>
              <td className="font-semibold">
                {ujian?.status !== 'Belum' ? '18 Januari 2024 | 17:11:03' : '-'}
              </td>
            </tr>
            <tr>
              <td colSpan={3}>
                {ujian?.status === 'Ulang' && (
                  <Button size="sm" variant="text-colorful" className="p-0">
                    Riwayat pengerjaan
                  </Button>
                )}
              </td>
            </tr>
          </tbody>
        </table>
        <div
          className={cn(
            'flex flex-col items-center w-24 rounded-md bg-gray-50 p-3',
            {
              'bg-green-100': ujian?.status === 'Sudah',
              'bg-red-100': ujian?.status === 'Ulang',
            }
          )}
        >
          <Text size="sm" weight="medium" variant="lighter">
            Nilai
          </Text>
          <Text size="3xl" weight="bold" variant="dark" className="mt-1">
            {ujian?.status === 'Sudah'
              ? 100
              : ujian?.status === 'Ulang'
              ? 40
              : '-'}
          </Text>
        </div>
      </div>
      <CardSeparator />
      <ModalFooterButtons cancel="Batal" onCancel={() => setShowModal(false)}>
        {ujian?.status === 'Sudah' ? (
          <div className="flex-1">
            <Button className="w-full" disabled>
              Mulai Ujian
            </Button>
          </div>
        ) : (
          <Link
            href={`${routes.peserta.kelas}/diskusi/detail/ujian/kerjakan`}
            className="flex-1"
          >
            <Button className="w-full">Mulai Ujian</Button>
          </Link>
        )}
      </ModalFooterButtons>
    </Modal>
  )
}
