import {
  Button,
  CardSeparator,
  Modal,
  ModalFooterButtons,
  Text,
} from '@/components/ui'
import { routes } from '@/config/routes'
import { useRouter } from 'next-nprogress-bar'
import { useParams } from 'next/navigation'

type MulaiUjianModalProps = {
  show?: boolean
  setShow(show: boolean): void
  jumlahSoal: number | undefined
  durasi: number | undefined
}

export default function MulaiUjianModal({
  show = false,
  setShow,
  jumlahSoal,
  durasi,
}: MulaiUjianModalProps) {
  const router = useRouter()
  const { kelas: idKelas, id }: { kelas: string; id: string } = useParams()

  return (
    <Modal
      title="Mulai Ujian"
      size="sm"
      isOpen={show}
      headerClassName="[&_.modal-title]:text-lg"
      onClose={() => setShow(false)}
    >
      <div className="flex flex-col p-3">
        <Text weight="semibold" variant="dark" align="center">
          Apakah Anda yakin ingin memulai ujian?
        </Text>
        <div className="flex gap-x-2 mt-2">
          <div className="flex flex-col items-center flex-1 bg-slight-blue rounded-md p-2">
            <Text size="xs" weight="medium">
              Jumlah Soal
            </Text>
            <Text weight="semibold" variant="dark">
              {jumlahSoal || '-'} soal
            </Text>
          </div>
          <div className="flex flex-col items-center flex-1 bg-slight-green rounded-md p-2">
            <Text size="xs" weight="medium">
              Durasi Pengerjaan
            </Text>
            <Text weight="semibold" variant="dark">
              {durasi || '-'} menit
            </Text>
          </div>
        </div>
      </div>
      <CardSeparator />
      <ModalFooterButtons cancel="Tidak" onCancel={() => setShow(false)}>
        <div className="flex-1">
          <Button
            className="w-full"
            onClick={() =>
              router.push(
                `${routes.pengguna.ruangKelas}/${idKelas}/ujian/${id}/kerjakan`
              )
            }
          >
            Ya
          </Button>
        </div>
      </ModalFooterButtons>
    </Modal>
  )
}
