import { Button } from '@/components/ui'
import { useShowModal } from '@/hooks/use-show-modal'
import { useState } from 'react'
import SesiBahanAjarModal from './modal/sesi-bahan-ajar'
import SumberBahanAjarModal from './modal/sumber-bahan-ajar'

export default function DuplikatBahanAjar() {
  const [showSumber, setShowSumber] = useState(false)
  const {
    show: showPilihSesi,
    key: kelasSumber,
    doShow: setKelasSumber,
    doHide: closePilihSesi,
  } = useShowModal<string>()

  return (
    <>
      <Button size="sm" color="secondary" onClick={() => setShowSumber(true)}>
        Duplikat Bahan Ajar
      </Button>

      <SumberBahanAjarModal
        show={showSumber}
        onHide={() => setShowSumber(false)}
        onSelect={(idKelas) => setKelasSumber(idKelas)}
      />

      <SesiBahanAjarModal
        idKelas={kelasSumber}
        show={showPilihSesi}
        onHide={closePilihSesi}
      />
    </>
  )
}
