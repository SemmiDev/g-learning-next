'use client'

import { ActionIcon, Button } from '@/components/ui'
import { useShowModal } from '@/hooks/use-show-modal'
import { useParams } from 'next/navigation'
import { GrShareOption } from 'react-icons/gr'
import PengaturanKelasModal from '../modal/pengaturan-kelas'

export default function KelasHeaderAction() {
  const {
    show: showPengaturan,
    key: keyPengaturan,
    doShow: doShowPengaturan,
    doHide: doHidePengaturan,
  } = useShowModal<string>()

  const { kelas: idKelas }: { kelas: string } = useParams()

  return (
    <>
      <div className="flex space-x-2 items-center">
        <ActionIcon size="sm" variant="outline">
          <GrShareOption size={16} />
        </ActionIcon>
        <Button
          size="sm"
          className="h-7"
          onClick={() => doShowPengaturan(idKelas)}
        >
          Pengaturan
        </Button>
      </div>

      <PengaturanKelasModal
        show={showPengaturan}
        id={keyPengaturan}
        onHide={doHidePengaturan}
      />
    </>
  )
}
