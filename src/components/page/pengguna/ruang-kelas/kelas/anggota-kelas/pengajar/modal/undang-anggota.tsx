import { DataType as DataKelasType } from '@/actions/pengguna/ruang-kelas/lihat'
import {
  ActionIcon,
  CardSeparator,
  Modal,
  ModalFooterButtons,
} from '@/components/ui'
import { useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useMemo } from 'react'
import toast from 'react-hot-toast'
import { MdOutlineContentCopy } from 'react-icons/md'
import { Input } from 'rizzui'

type PengajarUndangAnggotaModalProps = {
  showModal?: boolean
  setShowModal(show: boolean): void
}

export default function PengajarUndangAnggotaModal({
  showModal = false,
  setShowModal,
}: PengajarUndangAnggotaModalProps) {
  const queryClient = useQueryClient()

  const { kelas: idKelas }: { kelas: string } = useParams()

  const kelas = queryClient.getQueryData<DataKelasType>([
    'pengguna.ruang-kelas.lihat',
    idKelas,
  ])

  const kodeUndang = kelas?.kelas.kode_unik || ''

  const linkUndangan = useMemo(
    () => `${window.location.origin}/undangan-kelas/${kodeUndang}`,
    [kodeUndang]
  )

  return (
    <Modal
      title="Undang Anggota Kelas"
      headerClassName="[&_.modal-title]:text-lg"
      isOpen={showModal}
      onClose={() => setShowModal(false)}
    >
      <div className="flex flex-col gap-4 p-3">
        <Input
          label="Kode Unik"
          value={kodeUndang}
          className="font-semibold text-gray-dark"
          suffix={
            <ActionIcon
              size="sm"
              variant="text"
              className="-me-2"
              onClick={async () => {
                await navigator.clipboard.writeText(kodeUndang)
                toast.success('Kode berhasil disalin.', {
                  position: 'bottom-center',
                })
              }}
            >
              <MdOutlineContentCopy />
            </ActionIcon>
          }
          readOnly
        />
        <Input
          label="Bagikan melalui link"
          value={linkUndangan}
          className="font-semibold text-gray-dark"
          suffix={
            <ActionIcon
              size="sm"
              variant="text"
              className="-me-2"
              onClick={async () => {
                await navigator.clipboard.writeText(linkUndangan)
                toast.success('Link berhasil disalin.', {
                  position: 'bottom-center',
                })
              }}
            >
              <MdOutlineContentCopy />
            </ActionIcon>
          }
          readOnly
        />
      </div>

      <CardSeparator />

      <ModalFooterButtons cancel="Tutup" onCancel={() => setShowModal(false)} />
    </Modal>
  )
}
