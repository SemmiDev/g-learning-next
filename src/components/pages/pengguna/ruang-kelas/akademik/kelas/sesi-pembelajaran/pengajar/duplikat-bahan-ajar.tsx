import { Button, KelasItemType } from '@/components/ui'
import { useState } from 'react'
import SesiBahanAjarModal from './modal/sesi-bahan-ajar'
import SumberBahanAjarModal from './modal/sumber-bahan-ajar'

export default function DuplikatBahanAjar() {
  const [showSumber, setShowSumber] = useState(false)
  const [showPilihSesi, setShowPilihSesi] = useState(false)
  const [kelasSumber, setKelasSumber] = useState<KelasItemType>()

  const handleCloseBahanAjar = () => {
    setShowSumber(false)
    setTimeout(() => setKelasSumber(undefined), 300)
  }

  const handleHidePilihSesi = () => {
    setShowPilihSesi(false)
    setTimeout(() => setKelasSumber(undefined), 300)
  }

  return (
    <>
      <Button size="sm" color="secondary" onClick={() => setShowSumber(true)}>
        Duplikat Bahan Ajar
      </Button>

      <SumberBahanAjarModal
        show={showSumber}
        defaultKelas={kelasSumber}
        onNext={() => setShowSumber(false)}
        onHide={handleCloseBahanAjar}
        onSelect={(kelas) => {
          setKelasSumber(kelas)
          setShowPilihSesi(true)
        }}
      />

      <SesiBahanAjarModal
        kelasSumber={kelasSumber}
        show={showPilihSesi}
        onHide={handleHidePilihSesi}
        onBack={() => {
          setShowPilihSesi(false)
          setShowSumber(true)
        }}
      />
    </>
  )
}
