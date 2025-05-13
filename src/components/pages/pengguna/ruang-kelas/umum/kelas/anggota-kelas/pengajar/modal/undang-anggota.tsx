import { lihatKelasAction } from '@/services/actions/pengguna/ruang-kelas/lihat'
import { ActionIconTooltip, Modal, ModalFooterButtons } from '@/components/ui'
import { useWindowLocation } from '@/hooks/use-window-location'
import { makeSimpleQueryDataWithId } from '@/utils/query-data'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
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
  const location = useWindowLocation()

  const { kelas: idKelas }: { kelas: string } = useParams()

  const { data: dataKelas } = useQuery({
    queryKey: ['pengguna.ruang-kelas.lihat', idKelas],
    queryFn: makeSimpleQueryDataWithId(lihatKelasAction, idKelas),
  })

  const kodeUndang = dataKelas?.kelas.kode_unik || ''

  const linkUndangan = `${location?.origin}/undangan-kelas/${kodeUndang}`

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
            <ActionIconTooltip
              tooltip="Salin"
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
            </ActionIconTooltip>
          }
          readOnly
        />
        <Input
          label="Bagikan melalui link"
          value={linkUndangan}
          className="font-semibold text-gray-dark"
          suffix={
            <ActionIconTooltip
              tooltip="Salin"
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
            </ActionIconTooltip>
          }
          readOnly
        />
      </div>

      <ModalFooterButtons
        cancel="Tutup"
        onCancel={() => setShowModal(false)}
        borderTop
      />
    </Modal>
  )
}
