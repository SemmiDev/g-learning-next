'use client'

import { ActionIcon, Button } from '@/components/ui'
import { useShowModal } from '@/hooks/use-show-modal'
import { useParams } from 'next/navigation'
import { GrShareOption } from 'react-icons/gr'
import PengaturanKelasModal from '../modal/pengaturan-kelas'
import UndangKelasModal from '../modal/undang-kelas'

type KelasHeaderActionProps = {
  tipe: 'Akademik' | 'Publik' | 'Privat' | undefined
  pemilik: boolean
}

export default function KelasHeaderAction({
  tipe,
  pemilik,
}: KelasHeaderActionProps) {
  const {
    show: showPengaturan,
    key: keyPengaturan,
    doShow: doShowPengaturan,
    doHide: doHidePengaturan,
  } = useShowModal<string>()
  const {
    show: showUndang,
    key: keyUndang,
    doShow: doShowUndang,
    doHide: doHideUndang,
  } = useShowModal<string>()

  const { kelas: idKelas }: { kelas: string } = useParams()

  return (
    <>
      <div className="flex space-x-2 items-center">
        {tipe === 'Publik' && (
          <ActionIcon
            size="sm"
            variant="outline"
            onClick={() => doShowUndang(idKelas)}
          >
            <GrShareOption size={16} />
          </ActionIcon>
        )}
        {pemilik && (
          <Button
            size="sm"
            className="h-7"
            onClick={() => doShowPengaturan(idKelas)}
          >
            Pengaturan
          </Button>
        )}
      </div>

      <UndangKelasModal
        show={showUndang}
        id={keyUndang}
        onHide={doHideUndang}
      />

      <PengaturanKelasModal
        show={showPengaturan}
        id={keyPengaturan}
        onHide={doHidePengaturan}
      />
    </>
  )
}
