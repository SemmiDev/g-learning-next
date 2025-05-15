import {
  ActionIconTooltip,
  Loader,
  Modal,
  ModalFooterButtons,
} from '@/components/ui'
import { useSessionJwt } from '@/hooks/use-session-jwt'
import { useWindowLocation } from '@/hooks/use-window-location'
import { lihatKelasApi } from '@/services/api/pengguna/ruang-kelas/lihat'
import { makeSimpleQueryData } from '@/utils/query-data'
import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { MdOutlineContentCopy } from 'react-icons/md'
import { Input } from 'rizzui'

type UndangKelasModalProps = {
  id: string | undefined
  show: boolean
  onHide: () => void
}

export default function UndangKelasModal({
  id,
  show,
  onHide,
}: UndangKelasModalProps) {
  const { jwt } = useSessionJwt()
  const location = useWindowLocation()

  const { data, isLoading } = useQuery({
    queryKey: ['pengguna.ruang-kelas.lihat', id],
    queryFn: makeSimpleQueryData(lihatKelasApi, jwt, id ?? null),
  })

  const kodeUndang = data?.kelas.kode_unik || ''

  const linkUndangan = `${location?.origin}/undangan-kelas/${kodeUndang}`

  const handleClose = () => {
    onHide()
  }

  return (
    <Modal
      title="Undang Anggota Kelas"
      headerClassName="[&_.modal-title]:text-lg"
      isOpen={show}
      onClose={handleClose}
    >
      {isLoading ? (
        <Loader height={250} />
      ) : (
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
      )}

      <ModalFooterButtons cancel="Tutup" onCancel={handleClose} borderTop />
    </Modal>
  )
}
