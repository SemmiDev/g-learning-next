'use client'

import { ActionIcon, Button } from '@/components/ui'
import { useShowModal } from '@/hooks/use-show-modal'
import { useParams } from 'next/navigation'
import { GrShareOption } from 'react-icons/gr'
import { PiGear } from 'react-icons/pi'
import PengaturanKelasModal from '../modal/pengaturan-kelas'
import UndangKelasModal from '../modal/undang-kelas'

type KelasHeaderActionProps = {
  pemilik: boolean
}

export default function KelasHeaderAction({ pemilik }: KelasHeaderActionProps) {
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
      <div className="absolute top-0 right-0 flex flex-col gap-2 items-center xs:flex-row">
        <ActionIcon
          size="sm"
          variant="outline"
          className="bg-white"
          onClick={() => doShowUndang(idKelas)}
        >
          <GrShareOption size={16} />
        </ActionIcon>
        {pemilik && (
          <>
            <Button
              size="sm"
              className="h-7 hidden sm:block"
              onClick={() => doShowPengaturan(idKelas)}
            >
              Pengaturan
            </Button>
            <ActionIcon
              size="sm"
              variant="outline"
              className="bg-white sm:hidden"
              onClick={() => doShowPengaturan(idKelas)}
            >
              <PiGear size={16} />
            </ActionIcon>
          </>
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
