import { Button, Modal, ModalFooterButtons, Text } from '@/components/ui'

type SelesaiUjianModalProps = {
  show?: boolean
  setShow(show: boolean): void
  totalSoal: number
  totalTerjawab: number
  onSelesaiUjian(): void
}

export default function SelesaiUjianModal({
  show = false,
  setShow,
  totalSoal,
  totalTerjawab,
  onSelesaiUjian,
}: SelesaiUjianModalProps) {
  const belum = totalSoal - totalTerjawab

  return (
    <Modal
      title="Selesaikan Ujian"
      size="sm"
      isOpen={show}
      headerClassName="[&_.modal-title]:text-lg"
      onClose={() => setShow(false)}
    >
      <div className="flex flex-col p-3">
        <div className="flex gap-x-2 mt-1 mb-3">
          <div className="flex flex-col items-center flex-1 bg-slight-blue rounded-md px-4 py-2">
            <Text size="2xs" weight="medium" variant="lighter" align="center">
              Jumlah soal
            </Text>
            <Text weight="semibold" variant="dark">
              {totalSoal}
            </Text>
          </div>
          <div className="flex flex-col items-center flex-1 bg-slight-green rounded-md px-4 py-2">
            <Text size="2xs" weight="medium" variant="lighter" align="center">
              Sudah dijawab
            </Text>
            <Text weight="semibold" variant="dark">
              {totalTerjawab}
            </Text>
          </div>
          <div className="flex flex-col items-center flex-1 bg-slight-red rounded-md px-4 py-2">
            <Text size="2xs" weight="medium" variant="lighter" align="center">
              Belum dijawab
            </Text>
            <Text weight="semibold" variant="dark">
              {belum}
            </Text>
          </div>
        </div>
        <Text weight="semibold" variant="dark" align="center">
          Apakah Anda yakin ingin menyelesaikan ujian ini?
        </Text>
      </div>

      <ModalFooterButtons
        cancel="Tidak"
        onCancel={() => setShow(false)}
        borderTop
      >
        <div className="flex-1">
          <Button className="w-full" onClick={onSelesaiUjian}>
            Ya
          </Button>
        </div>
      </ModalFooterButtons>
    </Modal>
  )
}
